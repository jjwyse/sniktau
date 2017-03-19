/* eslint-disable no-console */

import chalk from 'chalk';
const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red(err));
  },

  // Called to log an info level msg
  log: msg => {
    console.log(chalk.blue(msg));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(
      `
      ${chalk.bold('Access URLs:')}${divider}
      Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      ${divider}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      ${chalk.yellow(`Starting up...`)}
    `,
    );
  },
};

module.exports = logger;
