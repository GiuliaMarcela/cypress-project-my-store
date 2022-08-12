const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: true,
  videoUploadOnPasses: true,
  reporter: 'cypress-mochawesome-reporter',
  trashAssetsBeforeRuns: true,
  reporterOptions: {
    charts: false,
    reportPageTitle: 'automation-practice-report',
    reportFilename: '[status]--[name]-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    quiet: true,
    timestamp: 'dd-mmm-yyyy-HH-MM-ss'
  },
  e2e: {
    setupNodeEvents (on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      require('cypress-grep/src/plugin')(config)
      return config
    },
    baseUrl: 'http://automationpractice.com/'
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true
  }
})
