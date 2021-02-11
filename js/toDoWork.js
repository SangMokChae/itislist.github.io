const toDoForm = document.querySelector("#formToDos"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector("#pending-list"),
  finishList = document.querySelector("#finish-list");

const PENDING_LS = 'PENDING';
const FINISH_LS = 'FINISHED';

let toDos = [];
let finishedToDos = [];

// DELETE
function deleteToDo(evt) {
  const li = evt.path[1];
  pendingList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  saveLs(PENDING_LS, toDos);
}

function deleteFinish(evt) {
  const li = evt.path[1];
  finishList.removeChild(li);
  const cleanFinish = finishedToDos.filter((finish) => finish.id !== parseInt(li.id));
  finishedToDos = cleanFinish;
  saveLs(FINISH_LS, finishedToDos);
}

// SAVE
function saveLs(ls, data) {
  localStorage.setItem(ls, JSON.stringify(data));
}

// MOVE
function getContent(evt) {
  const li = evt.path[1];
  const text = li.querySelector('span').innerText;
  return text;
}

function goToFinish(evt) {
  const doValue = getContent(evt);
  deleteToDo(evt);
  paintFinish(doValue);
}

function returnToDo(evt) {
  const doValue = getContent(evt);
  deleteFinish(evt);
  paintPending(doValue);
}


// PRINT
function paintPending(text, id = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  let newId = toDos.length + 1;

  if (id !== null) {
    newId = id;
  }
  delBtn.innerHTML = 'X';
  delBtn.className = "btn btn-danger btn-sm";
  delBtn.addEventListener('click', deleteToDo);
  doneBtn.innerHTML = 'Go';
  doneBtn.className = "btn btn-success btn-sm";
  doneBtn.addEventListener('click', goToFinish);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveLs(PENDING_LS, toDos);
}

function paintFinish(text, id = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rtnBtn = document.createElement("button");
  const span = document.createElement("span");
  let newId = finishedToDos.length + 1;

  if (id !== null) {
    newId = id;
  }
  delBtn.innerHTML = 'X';
  delBtn.className = "btn btn-danger btn-sm";
  delBtn.addEventListener('click', deleteFinish);
  rtnBtn.innerHTML = 'Re';
  rtnBtn.className = "btn btn-primary btn-sm";
  rtnBtn.addEventListener('click', returnToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(rtnBtn);
  li.appendChild(delBtn);
  li.id = newId;
  finishList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  finishedToDos.push(finishedObj);
  saveLs(FINISH_LS, finishedToDos);
}

// SUBMIT EVENT
function startEvent(evt) {
  evt.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = '';
}

// LOAD
function loadToDos() {
  const loadedPendings = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISH_LS);
  if (loadedPendings !== null) {
    const parsedToDos = JSON.parse(loadedPendings);
    parsedToDos.forEach((toDo) => paintPending(toDo.text, toDo.id));
  }
  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach((toDo) => paintFinish(toDo.text, toDo.id));
  }
}

// INIT
function init() {
  loadToDos();
  toDoForm.addEventListener('submit', startEvent);
}

init();