import "./style.css";
import { allTodos, createTodo, findMatch, createNewProject, allProjects, saveToLocalStorage, removeFromLocalStorage,getFromLocalStorage } from "./todo-logic.js";
import { displayTodoInProjects, createProjectList } from "./manipulate-dom.js";

document.querySelector(".new-object").addEventListener("click", () => {
    const checkBoxContainer = document.getElementById("checkbox-field");
    checkBoxContainer.textContent = "";

    const optionsData = [];

    allProjects.list.slice(1).forEach(proj => {
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
        const matchedProj = findMatch(proj, allProjects);

        matchedProj.list.push(newTodo);
    })

    allTodos.list.push(newTodo);
    saveToLocalStorage(newTodo);
    saveToLocalStorage(allTodos);
    saveToLocalStorage(allProjects);
    displayTodoInProjects("All Tasks", allProjects);
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

    const newProj = createNewProject(userInput.title);
    allProjects.list.push(newProj);
    saveToLocalStorage(newProj);
    saveToLocalStorage(allProjects);
    createProjectList(allProjects);
})

createProjectList(allProjects);
displayTodoInProjects("All Tasks", allProjects);

console.log(allProjects);
console.log(allTodos);