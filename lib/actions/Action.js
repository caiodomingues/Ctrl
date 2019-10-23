const process = require("child_process");

module.exports = class Action {
  constructor() {
    this.process = process;
  }

  action() {
    throw new Error("You must implement the action method");
  }
};
