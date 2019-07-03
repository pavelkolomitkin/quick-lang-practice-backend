const fs = require('fs');

module.exports = (from, to, subject, message, callback = null) => {

    const fileName = 'mail_to_' + to + '' +new Date();

    const content = 'From: ' + from + '\n' +
        'To: ' + to + '\n' +
        'Subject: ' + subject + '\n' +
        'Message: ' + message;

    fs.writeFile(__dirname + '/../../mails/' + fileName, content, (error) => {

        if (error)
        {
            throw error;
        }

        if (callback)
        {
            callback();
        }
    });
};
