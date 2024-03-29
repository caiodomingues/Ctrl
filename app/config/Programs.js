const Chrome = require("../actions/Chrome");
const Youtube = require("../actions/Youtube");
const Self = require("../actions/Self");
const Kill = require("../actions/Kill");
const Spotify = require("../actions/Spotify");

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

  kill(args) {
    new Kill().action(args);
  }

  spotify(args) {
    new Spotify().action(args);
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
        break;
      case "spotify":
        this.spotify(args);
        break;
      case "kill":
        this.kill(args);
        break;
      default:
        throw new Error("Boot failed to choose program");
    }
  }
};
