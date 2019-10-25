const process = require("child_process");
const ctrl = require("../../config/app");

module.exports = class Action {
  constructor() {
    this.process = process;
    this.ctrl = ctrl;
  }

  action() {
    throw new Error("You must implement the action method");
  }
};
