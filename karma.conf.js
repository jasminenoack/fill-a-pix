var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        frameworks: ["jasmine"],

        files: [
            'spec/greeter.test.ts',
        ],

        preprocessors: {
            'spec/**/*.ts': ['webpack'],
        },

        webpack: webpackConfig, 

        reporters: ["progress"],

        browsers: ["ChromeHeadless"],

        mime: {
            'text/x-typescript': ['ts']
        }
  })
}
