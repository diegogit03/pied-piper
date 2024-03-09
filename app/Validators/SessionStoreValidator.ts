import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionStoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string(),
    })

    public messages: CustomMessages = {}
}
