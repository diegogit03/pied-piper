import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

import User from 'App/Models/User'
import ForgotStoreValidator from 'App/Validators/ForgotStoreValidator'

import { randomBytes } from 'crypto'
import { promisify } from 'util'
import ResetUpdateValidator from 'App/Validators/ResetUpdateValidator'

export default class PasswordResetsController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/forgot')
  }

  public async store({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotStoreValidator)
    const user = await User.findByOrFail('email', email)

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')
    await user.related('resetTokens').updateOrCreate(
      { userId: user.id },
      {
        token,
      }
    )

    await Mail.send((message) => {
      message
        .from('no-reply@piedpiper.com')
        .to(email)
        .subject('Pied Piper: recuperação de senha')
        .htmlView('emails/forgotPassword', {
          name: user.username,
          resetPasswordUrl: `${Env.get('APP_URL')}${Route.makeUrl(
            'auth.passwordResets.edit'
          )}?token=${token}`,
        })
    })

    return response.redirect().back()
  }

  public async edit({ request, view }: HttpContextContract) {
    const { token } = request.qs()

    return view.render('auth/reset', { token })
  }

  public async update({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetUpdateValidator)

    const userByToken = await User.query()
      .whereHas('resetTokens', (query) => {
        query.where('token', token)
      })
      .preload('resetTokens')
      .firstOrFail()

    userByToken.password = password
    await userByToken.save()
    await userByToken.resetTokens[0].delete()

    return response.redirect().toRoute('auth.sessions.create')
  }
}
