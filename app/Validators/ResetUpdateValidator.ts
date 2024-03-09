import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetUpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        token: schema.string(),
        password: schema.string({}, [rules.confirmed()]),
    })

    public messages: CustomMessages = {}
}
