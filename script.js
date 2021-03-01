import { initPageElements } from "./init_page.js";
import { TodoApp } from "./todo_app.js";

function changeStatus(id) {
  var status = document.getElementById(id + "_checkbox").checked;
  document
    .getElementById(id + "_span")
    .setAttribute("style", status ? "text-decoration: line-through;" : "");

  todoApp.handOff(id);
  return;
}

function deleteListItem(id) {
  if (!window.confirm("Are you sure you want to remove the todo?")) {
    return;
  }
  document.getElementById(id).remove();
  todoApp.removeTask(id);
  return;
}

function addListItem() {
  var caption = document.getElementById("add_caption").value;
  todoApp.addTask(caption);
  document.getElementById("add_caption").value = "";
  return;
}

function removeAllItems(listId) {
  if (!window.confirm("Are you sure you want to clear the list?")) {
    return;
  }
  document.getElementById(listId).innerHTML = "";
  todoApp.clearList(listId);
  return;
}

function editListItem(id) {
  todoApp.modifyTaskCaption(id);
  return;
}

export {
  changeStatus,
  deleteListItem,
  addListItem,
  removeAllItems,
  editListItem,
};

//Main program:

// Initialize the page elements
initPageElements();
// Run a new app instance
var todoApp = new TodoApp();
// todoApp.runApp();
