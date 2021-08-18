const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // ensure the request is not blocked by OPTIONS:
    if (req.method === 'OPTIONS') {
        return next()
    }
	try {
		const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        console.log('token')
        const isCustomAuth = token.length < 500
        let decodedToken
		if (!token) {
            console.log('heel')
			throw new Error('Authentication failed 1')
		}
        if(token && isCustomAuth) {
            decodedToken = jwt.verify(token, 'lukaku')
            // add data to the request:
            req.userData = { userId: decodedToken.userId }
            // allow to reach to below routers
        } if (token && !isCustomAuth) {
            //google auth:
            decodedToken = jwt.decode(token)
            req.userData = {userId: decodedToken?.sub}
        }
        next()
	} catch (err) {
		return res.status(403).json({
            success: false,
            error: 'authentication failed!'
        })
	}
}
