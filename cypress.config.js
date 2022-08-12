const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  videoUploadOnPasses: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: false,
    reportPageTitle: 'automation-practice-report',
    reportFilename: '[status]--[name]-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    quiet: true,
    timestamp: 'dd-mmm-yyyy-HH-MM-ss'
  },
  trashAssetsBeforeRuns: true,
  e2e: {
    setupNodeEvents (on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      require('cypress-grep/src/plugin')(config)
      return config
    },
    baseUrl: 'http://automationpractice.com/'
  }
})
