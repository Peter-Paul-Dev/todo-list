import { allTodos, findMatch } from "./todo-logic.js";

const container = document.querySelector(".container");

const todoDisplaySection = document.createElement("div");
todoDisplaySection.classList.add("todo-display");

const projectDisplaySection = document.createElement("div");
projectDisplaySection.classList.add("projects-display");

function displayTodo(targetTitle, arr) {
    projectDisplaySection.textContent = "";
    projectDisplaySection.remove();
    todoDisplaySection.remove();

    todoDisplaySection.textContent = "";
    container.append(todoDisplaySection);

    const targetTodo = findMatch(targetTitle, arr);

    const todoContainer  = document.createElement("div");
    todoContainer.classList.add("todo-info");
    todoDisplaySection.append(todoContainer);

    const titleText = document.createElement("h1");
    titleText.classList.add("property");
    titleText.textContent = targetTodo.title; 

    const dueDateText = document.createElement("p");
    dueDateText.classList.add("property");
    dueDateText.textContent = `Due date: ${targetTodo.dueDate}`;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("property");
    descriptionText.textContent = `Description: ${targetTodo.description}`;

    const priorityText = document.createElement("p");
    priorityText.classList.add("property");
    priorityText.textContent = `Priority: ${targetTodo.priority}`;

    const notesText = document.createElement("p");
    notesText.classList.add("property");
    notesText.textContent = `Notes: ${targetTodo.notes}`;

    const markAsDoneButton = document.createElement("button");
    markAsDoneButton.textContent = "Mark as done";
    markAsDoneButton.addEventListener("click", () => {
        const properties = document.querySelectorAll(".property");
        properties.forEach(property => {
            property.classList.add("complete")
        });

        targetTodo.doneStatus = "Done";
    });

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", () => {
        allTodos.deleteTodo(targetTitle);
        todoContainer.textContent = "";
    });
    
    todoContainer.append(titleText, dueDateText, descriptionText, priorityText, notesText, markAsDoneButton, deleteTodoButton);
    todoDisplaySection.append(todoContainer);
}

let outsideTargetProject = [];

function displayTodoInProjects (targetTitle, arr) {
    todoDisplaySection.remove();
    projectDisplaySection.remove()

    projectDisplaySection.textContent = "";
    container.append(projectDisplaySection);

    const insideTargetProject = findMatch(targetTitle, arr);
    
    insideTargetProject.forEach(todo => {
        const todoContainer  = document.createElement("div");
        todoContainer.classList.add("todo-info");
        todoContainer.dataset.taskTitle = todo.title;
        projectDisplaySection.append(todoContainer);

        const titleText = document.createElement("h1");
        titleText.classList.add("title");
        titleText.textContent = todo.title;

        const dueDateText = document.createElement("p");
        dueDateText.classList.add("due-date");
        dueDateText.textContent = todo.dueDate;

        todoContainer.append(titleText, dueDateText);
    })

    outsideTargetProject = insideTargetProject;
}

projectDisplaySection.addEventListener("click", (e) => {
        const clickedTask = e.target.dataset.taskTitle;

        if (!clickedTask) {return;}

        console.log(clickedTask);
        displayTodo(clickedTask, outsideTargetProject);
    })

function createProjectList(arr) {
    const projectContainer = document.querySelector(".projects");

    const projectList = document.createElement("ul");

    arr.forEach(item => {
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
export {todoDisplaySection, displayTodo, createProjectList}; 