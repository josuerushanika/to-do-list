import './style.css';

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