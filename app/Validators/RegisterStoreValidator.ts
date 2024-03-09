import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterStoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        username: schema.string(),
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({}, [rules.confirmed()]),
    })

    public messages: CustomMessages = {}
}
