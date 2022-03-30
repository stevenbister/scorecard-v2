/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('dotenv').config({ path: '.env.test.local' }) // Probs need to make this a little more flexible

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.email = process.env.SUPABASE_TEST_USER_EMAIL
  config.env.password = process.env.SUPABASE_TEST_USER_PASSWORD
  config.env.username = process.env.SUPABASE_TEST_USERNAME

  return config
}
