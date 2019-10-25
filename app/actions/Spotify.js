const Action = require("../../lib/actions/Action");
const fs = require("fs");

module.exports = class Spotify extends Action {
  constructor() {
    super();
  }

  genFile(play, key) {
    let content = `Set WshShell = WScript.CreateObject("WScript.Shell")
    Comandline = "${this.ctrl.path}\AppData\Roaming\Spotify\Spotify.exe"
    WScript.sleep 500
    CreateObject("WScript.Shell").Run("spotify:${play}")
    WScript.sleep 8000
    WshShell.SendKeys "${key}"
    `;

    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp", err => (err ? console.log(err) : "Created"));
    }

    fs.writeFile(`temp/spotify.vbs`, content, function(err) {
      return err ? console.log(err) : true;
    });
  }

  action(args) {
    let trim, play;

    if (args.match(/(playlist|track):\w+/)) {
      trim = args.split(":");
      args = trim[0];
      play = trim[1];
    }

    switch (args) {
      case "playlist":
        this.genFile(args + ":" + play, " ");
        break;
      case "track":
        this.genFile(args + ":" + play, "{ENTER}");
        break;
      default:
        throw new Error("Not a valid Spotify URI");
    }

    return this.process.exec(
      `start  ${this.ctrl.absolute_path}/temp/spotify.vbs`,
    );
  }
};
