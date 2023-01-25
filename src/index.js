import './style.css';

const listContainer = document.querySelector('#todo-list');

const LIST = [
  {
    description: 'Wash the dish',
    completed: false,
    index: 0,
  },
  {
    description: 'Complete to app list project',
    completed: false,
    index: 1,
  },
  {
    description: 'To do project',
    completed: false,
    index: 2,
  },

];

const loadTask = () => {
  const sortedList = LIST.sort((item1, item2) => item1.index - item2.index);

  for (let i = 0; i < sortedList.length; i += 1) {
    listContainer.innerHTML += `
      <div class="div-container"> 
        <form class="form-desc">
           
         <input type="checkbox" class="checkbox" <p class="description-task">&nbsp&nbsp${sortedList[i].description}
         <i class="fas fa-ellipsis-v pointer edit-task" aria-hidden="true"></i>
        </form>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', loadTask);
