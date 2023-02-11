/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Addons/Ally' {
  import { GitlabDriver, GitlabDriverConfig } from 'adonis-ally-gitlab/build/standalone'

  interface SocialProviders {
    gitlab: {
      config: GitlabDriverConfig
      implementation: GitlabDriver
    }
  }
}
