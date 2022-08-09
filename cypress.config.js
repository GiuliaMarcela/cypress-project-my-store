const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		baseUrl: 'http://automationpractice.com/index.php'
	},
});
