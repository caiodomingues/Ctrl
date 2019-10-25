const Action = require("../../lib/actions/Action");

module.exports = class Kill extends Action {
  constructor() {
    super();
  }

  action(args) {
    switch (args) {
      case "chrome":
        return this.process.exec("taskkill /F /IM chrome* /T");
      case "youtube":
        return this.process.exec("taskkill /F /IM chrome* /T");
      case "spotify":
        return this.process.exec("taskkill /F /IM spotify* /T");
      default:
        throw new Error("Option not found or wrong typed.");
    }
  }
};
