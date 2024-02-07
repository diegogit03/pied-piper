import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class GitlabsController {
    public async create({ ally }: HttpContextContract) {
        return ally.use('gitlab').redirect()
    }

    public async store({ response, ally, auth }: HttpContextContract) {
        const gitlab = ally.use('gitlab')

        if (gitlab.accessDenied()) {
            return 'Access was denied'
        }

        if (gitlab.stateMisMatch()) {
            return 'Request expired. Retry again'
        }

        if (gitlab.hasError()) {
            return gitlab.getError()
        }

        const gitlabUser = await gitlab.user()

        let user
        user = await User.findBy('gitlabId', gitlabUser.id)

        if (!user) {
            user = await User.create({
                username: gitlabUser.name,
                email: gitlabUser.email!,
                gitlabId: gitlabUser.id,
            })

            await user.related('folders').create({
                name: user.username,
            })
        }

        await auth.login(user)

        return response.redirect().toRoute('app.view')
    }
}
