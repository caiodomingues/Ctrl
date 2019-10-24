const Action = require("../../lib/actions/Action");

module.exports = class Chrome extends Action {
  constructor() {
    super();
  }

  action(args) {
    return this.process.exec(
      `start chrome ${args} --incognito --start-maximized --disable-notifications`,
    );
  }
};
