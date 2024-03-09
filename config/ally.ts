/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
    gitlab: {
        driver: 'gitlab',
        clientId: Env.get('GITLAB_CLIENT_ID'),
        clientSecret: Env.get('GITLAB_CLIENT_SECRET'),
        callbackUrl: 'http://localhost:3333/gitlab/callback',
    },
}

export default allyConfig
