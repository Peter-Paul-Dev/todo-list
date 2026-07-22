import { findMatch } from "./todo-logic.js";

const displaySection = document.querySelector(".todo-display");

function displayTodo(targetTitle, arr) {
    displaySection.className = "";
    displaySection.classList.add("todo-display");
    displaySection.textContent = "";

    const targetTodo = findMatch(targetTitle, arr);

    const todoContainer  = document.createElement("div");
    todoContainer.classList.add("todo-info");
    displaySection.append(todoContainer);

    const titleText = document.createElement("h1");
    titleText.classList.add("title");
    titleText.textContent = targetTodo.title; 

    const dueDateText = document.createElement("p");
    dueDateText.classList.add("due-date");
    dueDateText.textContent = `Due date: ${targetTodo.dueDate}`;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("description");
    descriptionText.textContent = `Description: ${targetTodo.description}`;

    const priorityText = document.createElement("p");
    priorityText.classList.add("priority");
    priorityText.textContent = `Priority: ${targetTodo.priority}`;

    const doneStatusText = document.createElement("p");
    doneStatusText.classList.add("done-status");
    doneStatusText.textContent = `Status: ${targetTodo.doneStatus}`; 

    const notesText = document.createElement("p");
    notesText.classList.add("notes");
    notesText.textContent = `Notes: ${targetTodo.notes}`;
    
    todoContainer.append(titleText, dueDateText, descriptionText, priorityText, doneStatusText, notesText);
}

function displayTodoInProjects (targetTitle, arr) {
    displaySection.className = "";
    displaySection.classList.add("projects-display");
    displaySection.textContent = "";

    const targetProject = findMatch(targetTitle, arr);
    
    targetProject.forEach(todo => {
        const todoContainer  = document.createElement("div");
        todoContainer.classList.add("todo-info");
        todoContainer.dataset.taskTitle = todo.title;
        displaySection.append(todoContainer);

        const titleText = document.createElement("h1");
        titleText.classList.add("title");
        titleText.textContent = todo.title;

        const dueDateText = document.createElement("p");
        dueDateText.classList.add("due-date");
        dueDateText.textContent = todo.dueDate;

        todoContainer.append(titleText, dueDateText);
    })

    displaySection.addEventListener("click", (e) => {
        const clickedTask = e.target.dataset.taskTitle;

        if (!clickedTask) {return;}

        console.log(arr);
        displayTodo(clickedTask, targetProject);
    })
}

function createTaskList(arr) {
    const taskContainer = document.querySelector(".tasks");

    const tasksList = document.createElement("ul");

    arr.forEach(item => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${item.title}: ${item.dueDate}`;
        taskItem.dataset.taskTitle = item.title;

        tasksList.append(taskItem);
    });

    taskContainer.addEventListener("click", (e) => {
        const clickedTask = e.target.dataset.taskTitle; 

        if (!clickedTask) {return;}

        displayTodo(clickedTask, arr);
        }
    )

    taskContainer.append(tasksList);
}

function createProjectList(arr) {
    const allProjectsExceptAllTodos = arr.slice(1);

    const projectContainer = document.querySelector(".projects");

    const projectList = document.createElement("ul");

    allProjectsExceptAllTodos.forEach(item => {
        const projectItem = document.createElement("li");
        projectItem.textContent = item.title;
        projectItem.dataset.projectTitle = item.title;

        projectList.append(projectItem);
    }); 

    projectContainer.addEventListener("click", (e) => {
        const clickedProject = e.target.dataset.projectTitle;

        if (!clickedProject) {return;}

        displayTodoInProjects(clickedProject, arr);
    })

    projectContainer.append(projectList);
}
export {displaySection, displayTodo, createTaskList, createProjectList};