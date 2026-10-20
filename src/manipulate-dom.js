import { workingTodoList, workingProjectList, saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, findMatch, } from "./todo-logic.js";

const container = document.querySelector(".container");

const todoDisplaySection = document.createElement("div");
todoDisplaySection.classList.add("todo-display");

const projectDisplaySection = document.createElement("div");
projectDisplaySection.classList.add("projects-display");

const listContainer = document.querySelector(".list-container");

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
            property.classList.add("complete");
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
        if (targetTodo.priority == "Not urgent" || null) {
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
        workingTodoList.deleteTodo(targetTodo.title);
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

let outsideTargetProject = {
    list: [],
}

function displayTodoInProjects (targetTitle, arr) {
    outsideTargetProject = {
        list: [],
    }
    todoDisplaySection.remove();
    projectDisplaySection.remove();

    projectDisplaySection.textContent = "";
    container.append(projectDisplaySection);

    const insideTargetProject = findMatch(targetTitle, arr);
    
    insideTargetProject.list.forEach(todo => {
        const targetTodo = todo;

        const todoContainer  = document.createElement("div");
        todoContainer.classList.add("todo-info");
        todoContainer.dataset.taskTitle = targetTodo.title;
        projectDisplaySection.append(todoContainer);

        const titleText = document.createElement("h1");
        titleText.classList.add("property");
        titleText.textContent = targetTodo.title;

        const dueDateText = document.createElement("p");
        dueDateText.classList.add("property");
        dueDateText.textContent = targetTodo.dueDate;

        const markAsDoneButton = document.createElement("button");
        
        if (targetTodo.isComplete == true) {
            markAsDoneButton.textContent = "Mark as Not Done";
        } 
        
        else {
            markAsDoneButton.textContent = "Mark as Done";
        }

        markAsDoneButton.classList.add("mark-as-done");

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.classList.add("delete");
        deleteTodoButton.textContent = "Delete";

        todoContainer.append(titleText, dueDateText, markAsDoneButton, deleteTodoButton);

        if (targetTodo.isComplete == true) {
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

            if (!clickedTask) {return};

            displayTodo(clickedTask, outsideTargetProject);
        }

        else if (e.target.matches(".mark-as-done")) {
            const clickedButton = e.target;
            const infoBox = clickedButton.parentElement;
            const clickedTask = findMatch(infoBox.dataset.taskTitle, outsideTargetProject);
            
            const displayedProperties = Array.from(infoBox.children).filter(item => item.classList.contains("property"));

            if (clickedTask.isComplete == false) {
                    clickedTask.changeCompleteStatus(true);
                    displayedProperties.forEach((property) => property.classList.add("complete"));
                    setMarkAsDoneButtonText(clickedTask, clickedButton);
                    saveToLocalStorage(clickedTask);
                    saveToLocalStorage(workingTodoList);
                    saveToLocalStorage(workingProjectList);
            } 
                
            else if (clickedTask.isComplete == true) {
                    clickedTask.changeCompleteStatus(false);
                    displayedProperties.forEach((property) => property.classList.remove("complete"));
                    setMarkAsDoneButtonText(clickedTask, clickedButton);
                    saveToLocalStorage(clickedTask);
                    saveToLocalStorage(workingTodoList);
                    saveToLocalStorage(workingProjectList);
            }
        }

        else if (e.target.matches(".delete")) {
            const clickedButton = e.target;
            const infoBox = clickedButton.parentElement;
            const clickedTask = findMatch(infoBox.dataset.taskTitle, outsideTargetProject);

            workingTodoList.deleteTodo(clickedTask.title);
            saveToLocalStorage(workingTodoList);
            infoBox.remove();
        }

        function setMarkAsDoneButtonText(obj, btn) {
            if (obj.isComplete == false) {
                btn.textContent = "Mark as Done";
            }

            else if (obj.isComplete == true) {
                btn.textContent = "Mark as Not Done";
            }
        }
    })

function createProjectList(arr) {
    listContainer.textContent = "";

    const projectList = document.createElement("ul");

    arr.list.forEach(item => {
        const projectItem = document.createElement("li");
        projectItem.textContent = item.title;
        projectItem.classList.add("project-array");
        projectItem.dataset.projectTitle = item.title;

        if (item.title == "All Tasks") {
            projectList.append(projectItem);
        } 
        
        else {
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            const deleteProjectButton = document.createElement("button");
            deleteProjectButton.textContent = "Delete";
            deleteProjectButton.classList.add("delete-project");
            deleteProjectButton.dataset.projectTitle = item.title;

            buttonContainer.append(addTaskButton, deleteProjectButton);

            projectItem.append(buttonContainer);

            projectList.append(projectItem);
        }
    }); 

    listContainer.append(projectList);
}

listContainer.addEventListener("click", (e) => {
        if (e.target.matches(".project-array")) {
            const clickedProject = e.target.dataset.projectTitle;

            if (!clickedProject) {return};

            displayTodoInProjects(clickedProject, workingProjectList);
        } 
        
        else if (e.target.matches(".delete-project")) {
            const clickedProject = e.target.dataset.projectTitle;

            if (!clickedProject) {return};

            workingProjectList.deleteProject(clickedProject);
            saveToLocalStorage(workingProjectList);
            createProjectList(workingProjectList);
        }
    })

export {todoDisplaySection, displayTodo, displayTodoInProjects, createProjectList}; 