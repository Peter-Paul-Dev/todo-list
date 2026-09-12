import "./style.css";
import { allTodos, createTodo, findMatch, createNewProject, allProjects } from "./todo-logic.js";
import { displayTodoInProjects, createProjectList } from "./manipulate-dom.js";

const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not Urgent", "None");

const newArr = createNewProject("My New Project List");

const newTask = createTodo("Test stuff", "Finish testing stuff", "When I feel like it", "Not Urgent", "None");
const newerTask = createTodo("Buy food", "Buy food for tomorrow", "Tonight", "Urgent", "Remeber to buy mayo");

newArr.addToProject("Test stuff");
newArr.addToProject("Buy food");

createTodo("Feed the cat", "Feed my cats their dinner", "7:00 PM", "Urgent", "None");

createNewProject("New stuff");

findMatch("New stuff", allProjects).addToProject("Feed the cat");

createProjectList(allProjects);

displayTodoInProjects("All Tasks", allProjects);

const checkBoxContainer = document.getElementById("checkbox-field");

const optionsData = [];

allProjects.slice(1).forEach(proj => {
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

document.querySelector("#add-new-task").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    const userInputs = {};

    for (const key of formData.keys()) {
        if (formData.get(key).toString().length > 0) {
            userInputs[key] = formData.get(key).toString();
        }
    }

    const newTodo = createTodo(userInputs.title, userInputs.description, userInputs.dueDate, userInputs.priority, userInputs.notes);
    newTodo.parentProjects = newTodo.parentProjects.concat(userInputs.parentProjects);
    
    newTodo.parentProjects.slice(1).forEach((proj) => {
        const matchedProj = findMatch(proj, allProjects);

        matchedProj.push(newTodo);
    })

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

    console.log(userInput);
    createNewProject(userInput.title);
    createProjectList(allProjects);
})

console.log(allProjects);
console.log(allTodos);
console.log(newArr);
console.log(optionsData);