import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class GitlabsController {
  public async create({ ally }: HttpContextContract) {
    return ally.use('gitlab').redirect()
  }

  public async store({ ally, auth }: HttpContextContract) {
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

    const user = await User.firstOrCreate(
      {
        gitlabId: gitlabUser.id,
      },
      {
        username: gitlabUser.name,
        email: gitlabUser.email!,
        gitlabId: gitlabUser.id,
      }
    )

    await auth.login(user)

    return 'logged!'
  }
}
