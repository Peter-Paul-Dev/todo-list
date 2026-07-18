import { allTodos, createTodo, createNewProject, allProjects } from "./todo-logic.js";

const displaySection = document.getElementById("todo-display");

function displayTodo(obj) {
    const todoContainer  = document.createElement("div");
    displaySection.append(todoContainer);

    const titleText = document.createElement("h1");
    titleText.classList.add("title");
    titleText.textContent = obj.title; 

    const dueDateText = document.createElement("h2");
    dueDateText.classList.add("due-date");
    dueDateText.textContent = obj.dueDate;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("description");
    descriptionText.textContent = obj.description;

    const priorityText = document.createElement("p");
    priorityText.classList.add("priority");
    priorityText.textContent = obj.priority;

    const doneStatusText = document.createElement("p");
    doneStatusText.classList.add("done-status");
    doneStatusText.textContent = obj.doneStatus; 

    const notesText = document.createElement("p");
    notesText.classList.add("notes");
    notesText.textContent = obj.notes;
    
    todoContainer.append(titleText, dueDateText, descriptionText, priorityText, doneStatusText, notesText);
}