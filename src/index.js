import './style.css';
import addstate from './modules/filestatus.js';

let Taskarray = [];
const allTask = document.querySelector('.displayed-element');
const nouveauTask = document.querySelector('#task-description');
const addTaskForm = document.querySelector('#new-task');
const resete = document.querySelector('.refresh');

const clearAll = () => {
  Taskarray = [];
};

const addListToLocalStorage = () => {
  localStorage.setItem('myTodoTasks', JSON.stringify(Taskarray));
};

const getListFromLocalStorage = () => {
  if (localStorage.getItem('myTodoTasks')) {
    Taskarray = Array.from(JSON.parse(localStorage.getItem('myTodoTasks')));
  }
  return Taskarray;
};

// refresh items

const refreshItems = (Taskarray) => {
  for (let i = 0; i < Taskarray.length; i += 1) {
    const index = i + 1;
    Taskarray[i].index = index;
  }
};

// edition des tasks

const taskEdit = (desctask, index) => {
  for (let j = 0; j < Taskarray.length; j += 1) {
    if (Taskarray[j] === index) {
      Taskarray[j] += '*';
    }
    Taskarray[index - 1].description = desctask;
    addListToLocalStorage();
  }
};

// Items read

const createTask = () => {
  allTask.innerHTML = ' ';
  const mylocal = getListFromLocalStorage();
  mylocal.forEach((task) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input', 'fas', 'fa-trash-can');
    checkbox.setAttribute('type', 'checkbox');
    if (task.checked === true) {
      checkbox.setAttribute('checked', 'checked');
    }

    checkbox.addEventListener('change', (e) => {
      e.preventDefault();
      addstate(Taskarray, e.target, task.index);
      addListToLocalStorage();
    });

    const taskDesc = document.createElement('input');
    taskDesc.classList.add('todotask');
    taskDesc.value = task.description;

    const deleteTask = document.createElement('i');
    taskDesc.addEventListener('change', (e) => {
      e.preventDefault();
      taskEdit(e.target.value, task.index);
      taskDesc.blur();
    });
    deleteTask.classList.add('fas', 'fa-trash-can');

    deleteTask.addEventListener('click', (e) => {
      const myLocalStorage = getListFromLocalStorage();
      myLocalStorage.forEach((item, key) => {
        if (item.description === e.target.parentNode.children[1].value) {
          myLocalStorage.splice(key, 1);
        }
      });
      Taskarray = myLocalStorage;
      refreshItems(Taskarray);
      addListToLocalStorage();
      e.target.parentElement.remove();
    });

    li.append(checkbox, taskDesc, deleteTask);
    allTask.appendChild(li);
  });
};

const addToTasks = () => {
  const len = Taskarray.length;
  Taskarray.push({
    checked: false,
    description: nouveauTask.value,
    index: len + 1,
  });
  nouveauTask.value = '';
  addListToLocalStorage();
  createTask();
};

// prevent empty submition

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('task-description').value;
  if (input.length === 0) {
    return false;
  }
  addToTasks();
  return true;
});

document.addEventListener('DOMContentLoaded', () => {
  getListFromLocalStorage();
  createTask();
});

resete.addEventListener('click', () => {
  clearAll();
  addListToLocalStorage();
  createTask();
});

// add filter and remove all
const removeAllCompletedTasks = () => {
  const completedTasks = Taskarray.filter((task) => task.checked !== true);
  Taskarray = completedTasks;
  console.log('click', Taskarray);
  addListToLocalStorage();
  createTask();
};

const clearAllCompletedTasks = document.querySelector('.clear-completed-task');

clearAllCompletedTasks.addEventListener('click', () => {
  removeAllCompletedTasks();
});