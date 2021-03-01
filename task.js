import { generateRandomId } from "./helpers.js";

function Task(caption, set = false) {
  var id = generateRandomId();
  var caption = caption;
  var status = set;
  //CAN'T USE ACCESSORS, IDK Why?
  this.getId = function getId() {
    return id;
  };
  this.setId = function setId(newId) {
    id = newId;
  };
  this.getCaption = function getCaption() {
    return caption;
  };
  this.setCaption = function (newCaption) {
    caption = newCaption;
  };
  this.getStatus = function getStatus() {
    return status;
  };
  this.setStatus = function setStatus(newStatus) {
    status = newStatus;
  };
}

export { Task };
