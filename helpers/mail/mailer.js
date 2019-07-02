const Twig = require('twig');

const sendMail = process.env.APP_ENV === 'dev' ? require('./devMailer') : require('./prodMailer');

const fromEmail = process.env.NOREPLY_EMAIL;

const linkBaseUrl = (process.env.APP_ENV === 'dev' ? 'http' : 'https') + '://' + process.env.EMAIL_LINK_HOST;

const templateDirectory = __dirname + '/../../templates/mail';


module.exports.sendRegisterConfirmation = async (registerKey) => {


    return Twig.renderFile( templateDirectory + '/register.html.twig', {

        link: linkBaseUrl + '/security/register-confirm/' + registerKey.key,
        user: registerKey.client

    }, (error, html) => {

        if (error)
        {
            throw error;
        }

        sendMail(fromEmail, registerKey.client.email, 'You have registered!', html);

    });

};

module.exports.sendPasswordRestoreLink = async (passwordRestoreKey) => {

    return Twig.renderFile(templateDirectory + '/restore-password.html.twig', {
        link: linkBaseUrl + '/security/password-recovery/' + passwordRestoreKey.key
    }, (error, html) => {

        if (error)
        {
            throw error;
        }

        sendMail(fromEmail, passwordRestoreKey.user.email, 'Restore Password', html);
    });
};

module.exports.sendPasswordRestoredNotify = (user) => {

    return Twig.renderFile(templateDirectory + '/password-restored-notify.html.twig', {
        user: user
    }, (error, html) => {

        if (error)
        {
            throw error;
        }

        sendMail(fromEmail, user.email, 'You have restored your password', html);
    });
};
