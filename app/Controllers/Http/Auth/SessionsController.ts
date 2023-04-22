import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionStoreValidator from 'App/Validators/SessionStoreValidator'

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(SessionStoreValidator)

    await auth.attempt(payload.email, payload.password)

    return response.redirect().toRoute('app.home')
  }
}
