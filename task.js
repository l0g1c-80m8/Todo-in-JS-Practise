function Task(props) {
  var id = generateRandomId();
  var caption = props.caption;
  var status = props.status;
  composeListItem();

  function generateRandomId() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + "-" + S4() + "-" + S4() + "-" + S4();
  }

  function composeListItem() {
    var listItem = document.createElement("li");
    listItem.setAttribute("id", id);
    listItem.setAttribute("draggable", "true");
    listItem.setAttribute("class", "dropzone");

    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", id + "_checkbox");
    checkBox.checked = status;
    checkBox.addEventListener("change", function () {
      markComplete(id);
    });

    var span = document.createElement("SPAN");
    span.setAttribute("id", id + "_span");
    span.setAttribute("contenteditable", "true");
    span.setAttribute("style", status ? "text-decoration: line-through" : "");
    span.innerHTML = caption;
    span.addEventListener("blur", function () {
      modifyCaption(id + "_span");
    });

    var delBtn = document.createElement("INPUT");
    delBtn.setAttribute("id", id + "_delete_btn");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("value", "Delete");
    delBtn.setAttribute("style", "padding: 2px; margin: 5px");
    delBtn.addEventListener("click", function () {
      deleteTask(id);
    });

    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    listItem.appendChild(delBtn);

    props.appendListItem(listItem);
    return;
  }

  function modifyCaption(id) {
    caption = document.getElementById(id).innerHTML;
  }

  function deleteTask(id) {
    document.getElementById(id).remove();
    props.deleteTask(id);
    return;
  }

  function markComplete(id) {
    props.markComplete(id);
    deleteTask(id);
    return;
  }

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
