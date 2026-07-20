import { findMatch } from "./todo-logic.js";

const displaySection = document.querySelector(".todo-display");

function displayTodo(targetTitle, arr) {
    const targetTodo = findMatch(targetTitle, arr);

    displaySection.textContent = "";

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

function createTaskList(arr) {
    const taskContainer = document.querySelector(".tasks");

    const tasksList = document.createElement("ul");

    arr.forEach(item => {
        const taskItem = document.createElement("li");
        taskItem.textContent = item.title;

        tasksList.append(taskItem);
    });

    taskContainer.append(tasksList);
}

function createProjectList(arr) {
    const allProjectsExceptAllTodos = arr.splice(1);

    const projectContainer = document.querySelector(".projects");

    const projectList = document.createElement("ul");

    allProjectsExceptAllTodos.forEach(item => {
        const projectItem = document.createElement("li");
        projectItem.textContent = item.title;

        projectList.append(projectItem);
    });

    projectContainer.append(projectList);
}

export {displaySection, displayTodo, createTaskList, createProjectList};