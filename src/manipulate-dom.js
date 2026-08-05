import { allTodos, findMatch } from "./todo-logic.js";

const container = document.querySelector(".container");

const todoDisplaySection = document.createElement("div");
todoDisplaySection.classList.add("todo-display");

const projectDisplaySection = document.createElement("div");
projectDisplaySection.classList.add("projects-display");

function displayTodo(targetTitle, arr) {
    projectDisplaySection.textContent = "";
    projectDisplaySection.remove();

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
    markAsDoneButton.addEventListener("click", () => {
        const properties = document.querySelectorAll(".property");
        
        if (targetTodo.isComplete == false) {
            properties.forEach(property => {
            property.classList.add("complete")
        });

            targetTodo.changeCompleteStatus(true);
            setMarkAsDoneButtonText();
        }

        else {
            properties.forEach(property => {
            property.classList.remove("complete")
        });

            targetTodo.changeCompleteStatus(false);
            setMarkAsDoneButtonText();
        }
    });

    function setMarkAsDoneButtonText () {
        if (targetTodo.isComplete == false) {
        markAsDoneButton.textContent = "Mark as 'Done'";
        } 
        else {
        markAsDoneButton.textContent = "Mark as 'Not Done'";
        }
    }

    setMarkAsDoneButtonText()

    const changePriorityButton = document.createElement("button");
    changePriorityButton.addEventListener("click", () => {
        targetTodo.changePriority();
        priorityText.textContent = `Priority: ${targetTodo.priority}`;

        setChangePriorityButtonText();
    })

    function setChangePriorityButtonText () {
        if (targetTodo.priority == "Not urgent") {
        changePriorityButton.textContent = "Mark as 'Urgent'";
        } 
        else {
        changePriorityButton.textContent = "Mark as 'Not Urgent'";
        }
    }

    setChangePriorityButtonText();

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", () => {
        allTodos.deleteTodo(targetTitle);
        todoContainer.textContent = "";
    });
    
    function checkIfTaskIsAlreadyComplete (obj) {
        if (obj.isComplete == true) {
        const properties = document.querySelectorAll(".property");
        properties.forEach((property) => {
            property.classList.add("complete");
         })
        }
    }

    todoContainer.append(titleText, dueDateText, descriptionText, priorityText, notesText, markAsDoneButton, changePriorityButton, deleteTodoButton);
    checkIfTaskIsAlreadyComplete(targetTodo);
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
        titleText.classList.add("property");
        titleText.textContent = todo.title;

        const dueDateText = document.createElement("p");
        dueDateText.classList.add("property");
        dueDateText.textContent = todo.dueDate;

        const markAsDoneButton = document.createElement("button");
        
        if (todo.isComplete == true) {
            markAsDoneButton.textContent = "Mark as Not Done";
        } 
        
        else {
            markAsDoneButton.textContent = "Mark as Done";
        }
        markAsDoneButton.classList.add("mark-as-done");

        function checkIfTaskIsAlreadyComplete (obj) {
            if (obj.isComplete == true) {
            const properties = document.querySelectorAll(".property");
            properties.forEach((property) => {
                property.classList.add("complete");
                })
            }
        }

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.classList.add("delete");
        deleteTodoButton.textContent = "Delete";

        todoContainer.append(titleText, dueDateText, markAsDoneButton, deleteTodoButton);

        if (todo.isComplete == true) {
            const properties = document.querySelectorAll(".property");
            properties.forEach((property) => {
                property.classList.add("complete");
            })
        }
    })

    outsideTargetProject = insideTargetProject;
}

projectDisplaySection.addEventListener("click", (e) => {
        if (e.target.matches(".todo-info")) {
            const clickedTask = e.target.dataset.taskTitle;

            if (!clickedTask) {return;}

            console.log(clickedTask);
            displayTodo(clickedTask, outsideTargetProject);
        }

        else if (e.target.matches(".mark-as-done")) {
            const clickedButton = e.target.closest("button");
            const infoBox = clickedButton.parentElement;
            const clickedTask = findMatch(infoBox.dataset.taskTitle, outsideTargetProject);

            console.log(clickedButton);
            console.log(clickedTask);
            console.log(infoBox);

            Array.from(infoBox.children).forEach(child => {
                const properties = infoBox.querySelectorAll(".property");

                if (clickedTask.isComplete == false) {
                    clickedTask.changeCompleteStatus(true);
                    properties.forEach(property => {
                        property.classList.add("complete");
                    })
                    clickedButton.textContent = "Mark as Not Done"
                } 
                
                else if (clickedTask.isComplete == true) {
                    clickedTask.changeCompleteStatus(false);
                    properties.forEach(property => {
                        property.classList.remove("complete");
                    })
                    clickedButton.textContent = "Mark as Done";
                }
            })
        }

        else if (e.target.matches(".delete")) {
            const clickedButton = e.target.closest("button");
            const infoBox = clickedButton.parentElement;
            const clickedTask = findMatch(infoBox.dataset.taskTitle, outsideTargetProject).title;

            allTodos.deleteTodo(clickedTask);
            infoBox.remove();
        }
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
export {todoDisplaySection, displayTodo, displayTodoInProjects, createProjectList}; 