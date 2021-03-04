import { Task } from "./task.js";

function TaskList(props) {
  var tasks = [];
  initTaskList(props.defaultTasksList);
  enableDragAndDrop(props.listId);

  function getNewTask(caption, status, spawnMode, spawnRelative) {
    return new Task({
      caption: caption,
      status: status,
      appendListItem: appendListItem,
      insertListItem: insertListItem,
      modifyListItem: modifyListItem,
      deleteTask: deleteTask,
      markComplete: markComplete,
      spawn: {
        mode: spawnMode ? spawnMode : "append",
        relative: spawnRelative,
      },
    });
  }

  function initTaskList(defaultTasksList) {
    if (Array.isArray(defaultTasksList)) {
      for (var i = 0; i < defaultTasksList.length; i++) {
        if (defaultTasksList[i].status === props.reqStatus) {
          tasks.push(
            getNewTask(
              defaultTasksList[i].caption,
              defaultTasksList[i].status,
              "append"
            )
          );
        }
      }
    }
    return;
  }

  function appendListItem(listItem) {
    document.getElementById(props.listId).appendChild(listItem);
    return;
  }

  function insertListItem(listItem, relativeIndex) {
    var relativeElement = document.getElementById(tasks[relativeIndex].getId());
    relativeElement.after(listItem);
    return;
  }

  function rearrangeElements(index1, index2) {
    var tempRef = tasks[index1];
    for (var i = index1; i < index2; i++) {
      tasks[i] = tasks[i + 1];
    }
    tasks[index2] = tempRef;
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
        rearrangeElements(index, indexDrop);
      }
    });

    return;
  }

  function modifyListItem(id, caption, status) {
    srch3: for (var i = 0; i < tasks.length; i++) {
      if (id === tasks[i].getId()) {
        break srch3;
      }
    }
    var newTask = getNewTask(caption, status, "after", i);
    tasks.splice(i, 0, newTask);
    return;
  }

  function deleteTask(id) {
    srch: for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        tasks.splice(i, 1);
        break srch;
      }
    }
    return;
  }

  function markComplete(id) {
    srch2: for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        break srch2;
      }
    }
    props.handOff(tasks[i]);
    return;
  }

  this.addNewTask = function addNewTask(caption, status) {
    tasks.push(getNewTask(caption, status));
    return;
  };

  this.clearTasks = function clearTasks(listId) {
    document.getElementById(listId).textContent = "";
    tasks = [];
  };
}

export { TaskList };
