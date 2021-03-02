import { changeStatus, deleteListItem, editListItem } from "./script.js";

function composeListItem(task) {
  var listItem = document.createElement("li");
  listItem.setAttribute("id", task.getId());

  var checkBox = document.createElement("INPUT");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", task.getId() + "_checkbox");
  checkBox.checked = task.getStatus();
  checkBox.addEventListener("click", function () {
    changeStatus(task.getId());
  });

  var span = document.createElement("SPAN");
  span.setAttribute("id", task.getId() + "_span");
  span.setAttribute("contenteditable", "true");
  span.setAttribute(
    "style",
    task.getStatus() ? "text-decoration: line-through" : ""
  );
  span.innerHTML = task.getCaption();
  span.addEventListener("blur", function () {
    editListItem(task.getId());
  });

  var delBtn = document.createElement("INPUT");
  delBtn.setAttribute("id", task.getId() + "_delete_btn");
  delBtn.setAttribute("type", "button");
  delBtn.setAttribute("value", "Delete");
  delBtn.setAttribute("style", "padding: 2px; margin: 5px");
  delBtn.addEventListener("click", function () {
    deleteListItem(task.getId());
  });

  listItem.appendChild(checkBox);
  listItem.appendChild(span);
  listItem.appendChild(delBtn);

  return listItem;
}

function generateRandomId() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export { composeListItem, generateRandomId };
