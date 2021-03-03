import { Task } from "./task.js";
import { composeListItem } from "./helpers.js";

function TaskList(listId, newTasksList = [], reqStatus) {
  var tasks = [];
  initTaskList(newTasksList);
  enableDragAndDrop(listId);

  function initTaskList(newTasksList) {
    if (Array.isArray(newTasksList)) {
      for (var i = 0; i < newTasksList.length; i++) {
        if (newTasksList[i].status === reqStatus) {
          var newTask = new Task(
            newTasksList[i].caption,
            newTasksList[i].status
          );
          tasks.push(newTask);
          document
            .getElementById(listId)
            .appendChild(composeListItem(tasks[tasks.length - 1]));
        }
      }
    }
  }

  function switchElements(index1, index2) {
    var holder = tasks[index1];
    tasks[index1] = tasks[index2];
    tasks[index2] = holder;
    return;
  }

  function enableDragAndDrop(listId) {
    var listRef = document.getElementById(listId);
    var dragged, id, index, indexDrop, list, i;

    listRef.addEventListener("dragstart", function ({ target }) {
      dragged = target;
      id = target.id;
      list = listRef.children;
      for (i = 0; i < list.length; i++) {
        if (list[i] === dragged) {
          index = i;
          break;
        }
      }
    });

    listRef.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    listRef.addEventListener("drop", function ({ target }) {
      if (dragged && target.className === "dropzone" && target.id !== id) {
        dragged.remove(dragged);
        for (let i = 0; i < list.length; i += 1) {
          if (list[i] === target) {
            indexDrop = i;
          }
        }
        if (index > indexDrop) {
          target.before(dragged);
        } else {
          target.after(dragged);
        }
        switchElements(index, indexDrop);
      }
    });

    return;
  }

  this.addNewTask = function addNewTask(caption, set) {
    var newTask = new Task(caption, set);
    tasks.push(newTask);
    document.getElementById(listId).appendChild(composeListItem(newTask));
    return;
  };

  this.removeTask = function removeTask(id) {
    var index = -1;
    var removed;
    search: for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        index = i;
        break search;
      }
    }
    if (~index) {
      removed = tasks.splice(index, 1);
    }
    return removed;
  };

  this.clearTasks = function clearTasks() {
    tasks = [];
    return;
  };

  this.editCaption = function editCaption(id, caption, status) {
    var modifiedTask = new Task(caption, status);
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        tasks[i] = modifiedTask;
        return composeListItem(tasks[i]);
      }
    }
    return;
  };
}

export { TaskList };
