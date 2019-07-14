// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners

loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    //remove task
    taskList.addEventListener('click',removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className= 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
        link.className= 'delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
    
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Please Add a Task');
    }
    else{
        const li = document.createElement('li');
        li.className= 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
    
        const link = document.createElement('a');
        link.className= 'delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
    
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);
    
        taskInput.value='';
    }
    e.preventDefault();
}
//store task
function storeTaskInLocalStorage(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(e);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure to remove?')){
            e.target.parentElement.parentElement.remove();
            removeTasksFromStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTasksFromStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(t,index){
        if(task.textContent === t){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(){
    //taskList.innerHTML='';
    //faster method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTaskFromStorage();
}

function clearTaskFromStorage(){
    localStorage.clear();
}
function filterTasks(e){
   const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task){
       const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
   });
}