import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterStoreValidator from 'App/Validators/RegisterStoreValidator'

export default class RegistersController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterStoreValidator)

    const user = await User.create(payload)

    await auth.login(user)
    return 'Logged!'
  }
}
