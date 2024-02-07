import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      username: 'diegopiedpiper',
      email: 'diego@email.com',
      password: 'secret',
    })
  }
}
