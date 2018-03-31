module.exports = {
    database: 'mongodb://curly_braces:arit12345@ds247058.mlab.com:47058/ecommerce',
    secretKey: 'ironman is awesome!',
    facebook: {
        clientID: process.env.FACEBOOK_ID || '208897369870470',
        clientSecret: process.env.FACEBOOK_SECRET || '24720f4cbd5b86a4ff7e59fb017eda95',
        profileFields: ['emails','displayName'],
        callbackURL: 'http://buymyitems.herokuapp.com/auth/facebook/callback'
    }
}