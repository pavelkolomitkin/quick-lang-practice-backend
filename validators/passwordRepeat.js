module.exports = (value, { req }) => {

    if (value.trim() !== req.body.password.trim())
    {
        throw new Error('Passwords should be equal!');
    }
};
