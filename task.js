import { generateRandomId } from "./helpers.js";

function Task(caption, set = false) {
  var id = generateRandomId();
  var caption = caption;
  var status = set;
  //CAN'T USE ACCESSORS, IDK Why?
  this.getId = function getId() {
    return id;
  };
  this.getCaption = function getCaption() {
    return caption;
  };
  this.getStatus = function getStatus() {
    return status;
  };
}

export { Task };
