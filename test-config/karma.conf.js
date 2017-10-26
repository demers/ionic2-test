var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['mocha', 'chai', 'jasmine'],

  customLaunchers: {
    ChromeCustom: {
      base: 'ChromeHeadless',
      // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
      // more permissions than Docker allows by default)
      flags: isDocker ? ['--no-sandbox'] : []
    }
  },

  files: [
    'test/*.js'
  ],

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    reporters: ['kjhtml', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };

  config.set(_config);

  plugins: [
    require('karma-mocha'),
    require('karma-chai'),
    require('karma-chrome-launcher'),
    require('karma-mocha-reporter'),
    require('karma-junit-reporter')
  ],
  junitReporter: {
    outputDir: 'build'
  }

  };
