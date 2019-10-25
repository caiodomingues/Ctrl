const Action = require("../../lib/actions/Action");
const fs = require("fs");

module.exports = class Spotify extends Action {
  constructor() {
    super();
  }

  genFile(name, content) {
    fs.writeFile(`temp/${name}`, content, function(err) {
      return err ? console.log(err) : true;
    });
  }

  action(args) {
    let fname = "spotify.vbs";
    let fcontent = `Set WshShell = WScript.CreateObject("WScript.Shell")
    Comandline = "${this.ctrl.path}\AppData\Roaming\Spotify\Spotify.exe"
    WScript.sleep 500
    CreateObject("WScript.Shell").Run("spotify:playlist:3K8Gv0S4VdLTJixxr8owNg")
    WScript.sleep 8000
    WshShell.SendKeys " "`;

    args == "open"
      ? this.genFile(fname, fcontent)
      : new Error("Action not found");
    return this.process.exec(`start  ${this.ctrl.absolute_path}/temp/${fname}`);
  }
};
