var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],

        files: [
            'spec/**/*.test.ts',
        ],

        preprocessors: {
            'spec/**/*.ts': ['webpack'],
        },

        webpack: webpackConfig,

        reporters: ["spec"],

        browsers: ["ChromeHeadless"],

        mime: {
            'text/x-typescript': ['ts']
        }
    })
}
