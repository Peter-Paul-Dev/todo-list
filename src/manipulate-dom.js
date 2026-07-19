const displaySection = document.querySelector(".todo-display");

function displayTodo(obj) {
    displaySection.textContent = "";

    const todoContainer  = document.createElement("div");
    todoContainer.classList.add("todo-container");
    displaySection.append(todoContainer);

    const titleText = document.createElement("h1");
    titleText.classList.add("title");
    titleText.textContent = obj.title; 

    const dueDateText = document.createElement("p");
    dueDateText.classList.add("due-date");
    dueDateText.textContent = `Due date: ${obj.dueDate}`;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("description");
    descriptionText.textContent = `Description: ${obj.description}`;

    const priorityText = document.createElement("p");
    priorityText.classList.add("priority");
    priorityText.textContent = `Priority: ${obj.priority}`;

    const doneStatusText = document.createElement("p");
    doneStatusText.classList.add("done-status");
    doneStatusText.textContent = `Status: ${obj.doneStatus}`; 

    const notesText = document.createElement("p");
    notesText.classList.add("notes");
    notesText.textContent = `Notes: ${obj.notes}`;
    
    todoContainer.append(titleText, dueDateText, descriptionText, priorityText, doneStatusText, notesText);
}

export {displaySection, displayTodo};