const Action = require("../../lib/actions/Action");

module.exports = class Update extends Action {
  constructor() {
    super();
  }

  action(args) {
    switch (args) {
      case "update":
        return this.process.exec("git pull origin master");
      default:
        throw new Error("Option not found or wrong typed.");
    }
  }
};
