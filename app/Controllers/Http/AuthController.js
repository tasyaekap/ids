'use strict'
const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {
        let userx = new User()
        userx.username = request.input('username')
        userx.email = request.input('email')
        userx.password = request.input('password')

        await userx.save()

        return response.status(200).json(userx)
    }

    async login({ auth, request, response }) {
        let email = request.input('email')
        let password = request.input('password')

        try {
            let data_auth = await auth.authenticator('jwt').withRefreshToken().attempt(email, password)
            if (data_auth) {
                use('App/Models/User')
                let data_user = await User.findBy('email', email)
                let data = {
                    "user": data_user,
                    "auth": data_auth
                }
                return response.status(200).json(data)
            }
        } catch (e) {
            return response.status(202).json({ "message": "You need to register" })
        }
    }

    async logout({ auth, response }) {
        try {
            const apiToken = auth.getAuthHeader()
            await auth.authenticator("jwt").revokeTokens([apiToken])

            return response.status(200).json({ "message": "Logout success" })
        } catch (e) {
            return response.status(400).json({ "message": "Logout not success" })
        }

    }
}

module.exports = AuthController