module.exports = {
    database: 'mongodb://curly_braces:arit12345@ds247058.mlab.com:47058/ecommerce',
    secretKey: 'ironman is awesome!',
    facebook: {
        clientID: process.env.FACEBOOK_ID || '208897369870470',
        clientSecret: process.env.FACEBOOK_SECRET || '24720f4cbd5b86a4ff7e59fb017eda95',
        profileFields: ['emails','displayName'],
        callbackURL: 'https://7cd2586a91f844f1abe82ad17bba0146.vfs.cloud9.us-east-2.amazonaws.com/auth/facebook/callback'
    }
}