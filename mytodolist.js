let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let savetaskbtn = document.getElementById("savetaskbtn");
let deleteallbtn = document.getElementById("deleteallbtn");
let searchtextbox = document.getElementById("searchtextbox");

// show task list on browser refresh from local storage array
showtaskHandler();

// EventS
addtaskbtn.addEventListener("click", addTaskHandler);
deleteallbtn.addEventListener("click", deletealltaskhandler);
savetaskbtn.addEventListener("click", savetaskhandler);
searchtextbox.addEventListener("input", searchtask);

// main functions

// used to add tasks to local storage
function addTaskHandler() {
  let addtaskinputval = addtaskinput.value;

  if (addtaskinputval.trim() != 0) {
    // condition check to validate input to add task
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(addtaskinputval);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }
  cleartaskinput();
  showtaskHandler(); // display task list from local storage array
}

// used to Refresh and display tasks list from local storage array each time.
function showtaskHandler() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let addedtasklist = document.getElementById("addedtasklist");
  let html = ``;
  taskObj.forEach((item, index) => {
    html += `<tr id="row-${index + 1}" class="tasklist">
    <td>${index + 1}</td> 
    <td class="task">${item}</td>
    <td>
      <button type="button" class="btn btn-primary" onClick="edittask(${index})">EDIT</button>
      <button type="button" class="btn btn-danger" onClick="deletetask(${index})">DELETE</button>
    </td>
  </tr>`;
  });
  addedtasklist.innerHTML = html;
}

// onClick function used to edit tasks to local storage
function edittask(index) {
  let currentrow = document.getElementById(`row-${index + 1}`);
  let currentrowval = document.getElementById(`row-${index + 1}`).children[1]
    .innerText;
  // let currentrowval = document.getElementsByClassName("task").textContent;
  saveindex.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  addtaskinput.value = taskObj[index];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "inline-block";
  if (currentrowval === addtaskinput.value) {
    currentrow.style.backgroundColor = "#e3e3e4";
  }
  disablebtn();
}

//save task
function savetaskhandler() {
  addtaskbtn.style.display = "inline-block";
  savetaskbtn.style.display = "none";
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;
  taskObj[saveindex] = addtaskinput.value;
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtaskHandler();
  cleartaskinput();
}

//onClick function used to delete related task from local storage
function deletetask(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtaskHandler();
}

// deleteall
function deletealltaskhandler() {
  addtaskbtn.style.display = "inline-block";
  savetaskbtn.style.display = "none";

  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
    taskObj = [];
  }
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtaskHandler();
  cleartaskinput();
}

//search list
function searchtask() {
  // getting all table row within tbody by class name
  let trlist = document.getElementsByClassName("tasklist");
  Array.from(trlist).forEach(function (item) {
    // selecting task form task list
    let searchedtext = item.getElementsByTagName("td")[1].innerText;

    let searchtextboxval = searchtextbox.value;
    let re = new RegExp(searchtextboxval, "gi");
    if (searchedtext.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
}

// additional functions

// disable effect on button during edit
function disablebtn() {
  // getting all table row within tbody by class name
  let trlist = document.getElementsByClassName("tasklist");
  Array.from(trlist).forEach(function (item) {
    let btn1 = item.getElementsByTagName("td")[2].children[0];
    let btn2 = item.getElementsByTagName("td")[2].children[1];
    // console.log(btn); --- button
    // console.log(item); ---- tr
    btn1.setAttribute("disabled", "");
    btn2.setAttribute("disabled", "");
  });
}

// clear task input
function cleartaskinput() {
  addtaskinput.value = "";
}
