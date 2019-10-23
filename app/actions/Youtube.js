const Action = require("../../lib/actions/Action");

module.exports = class Youtube extends Action {
  constructor() {
    super();
  }

  action(args) {
    let regex = new RegExp(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
    );
    let temp = args.match(regex);

    return temp && temp[7].length == 11
      ? this.process.exec(
          `start chrome https://youtube.com/embed/${
            temp[7]
          }?autoplay=1 --incognito --start-maximized --disable-notifications --disable-translate`,
        )
      : false;
  }
};
