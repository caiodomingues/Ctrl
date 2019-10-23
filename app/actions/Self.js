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
      case "abort":
        return this.process.exec("shutdown /a");
      default:
        throw new Error("Option not found or wrong typed.");
    }
  }
};
