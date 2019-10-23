const Chrome = require("../actions/Chrome");
const Youtube = require("../actions/Youtube");
const Self = require("../actions/Self");

module.exports = class Programs {
  chrome(args) {
    new Chrome().action(args);
  }

  youtube(args) {
    new Youtube().action(args);
  }

  self(args) {
    new Self().action(args);
  }

  boot(program, args) {
    switch (program) {
      case "chrome":
        this.chrome(args);
        break;
      case "youtube":
        this.youtube(args);
        break;
      case "self":
        this.self(args);
      default:
        throw new Error("Boot failed to choose program");
    }
  }
};
