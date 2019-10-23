const Action = require("../../lib/actions/Action");

module.exports = class Self extends Action {
  constructor() {
    super();
  }

  action(args) {
    switch (args) {
      case "shutdown":
        return this.process.exec("shutdown /s /f");
      case "reboot":
        return this.process.exec("shutdown /r /f");
      case "update":
        return this.process.exec("git pull origin master");
      default:
        throw new Error("Option not found or wrong typed.");
    }
  }
};
