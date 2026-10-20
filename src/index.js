import "./style.css";
import { workingTodoList, workingProjectList, saveToLocalStorage, findMatch, createTodo, createNewProject } from "./todo-logic.js";
import { displayTodoInProjects, createProjectList } from "./manipulate-dom.js";

document.querySelector(".new-object").addEventListener("click", () => {
    const checkBoxContainer = document.getElementById("checkbox-field");
    checkBoxContainer.textContent = "";

    const optionsData = [];

    workingProjectList.list.slice(1).forEach(proj => {
        const option = {
            name: "project-option",
            value: proj.title,
        }

        optionsData.push(option);
    })

    optionsData.forEach(option => {
        const inputContainer = document.createElement("div");

        const optionLabel = document.createElement("label");
        optionLabel.htmlFor = option.value;
        optionLabel.textContent = option.value;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "parentProjects";
        checkbox.id = option.value;
        checkbox.value = option.value;

        inputContainer.append(optionLabel, checkbox);

        checkBoxContainer.append(inputContainer);
    })
});

document.querySelector("#add-new-task").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    const userInputs = {
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority"),
        notes: formData.get("notes"),
        parentProjects: formData.getAll("parentProjects"),
    };

    const newTodo = createTodo(userInputs.title, userInputs.description, userInputs.dueDate, userInputs.priority, userInputs.notes, false);
    newTodo.parentProjects = newTodo.parentProjects.concat(userInputs.parentProjects);
    
    newTodo.parentProjects.slice(1).forEach((proj) => {
        const matchedProj = findMatch(proj, workingProjectList);

        matchedProj.list.push(newTodo);
    })

    workingTodoList.list.push(newTodo);
    saveToLocalStorage(newTodo);
    saveToLocalStorage(workingTodoList);
    saveToLocalStorage(workingProjectList);
    displayTodoInProjects("All Tasks", workingProjectList);
});

document.querySelector("#add-new-project").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    const userInput = {};

    for (const key of formData.keys()) {
        if (formData.get(key).toString().length > 0) {
            userInput[key] = formData.get(key).toString();
        }
    }

    if (workingProjectList.list.some(elem => elem.title == userInput.title)) {
      return;
   } 

    const newProj = createNewProject(userInput.title);

    workingProjectList.list.push(newProj);
    saveToLocalStorage(newProj);
    saveToLocalStorage(workingProjectList);
    createProjectList(workingProjectList);
})

createProjectList(workingProjectList);
displayTodoInProjects("All Tasks", workingProjectList);