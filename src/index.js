import "./style.css";
import { allTodos, createTodo, createNewProject, allProjects } from "./todo-logic.js";
import { displaySection, displayTodo } from "./manipulate-dom.js";

const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

myTask.changePriority("Urgent");
myTask.markComplete("Done");

const newArr = createNewProject("newArr");

const newTask = createTodo("Test stuff", "Finish testing stuff", "When I feel like it", "Not urgent", "Not done", "None");
const newerTask = createTodo("Buy food", "Buy food for tomorrow", "Tonight", "Urgent", "Not done", "Remeber to buy mayo");

newArr.addToProject(newTask);
newArr.addToProject(newerTask);

console.log(allProjects);
console.log(allTodos);
console.log(newArr);

allTodos.removeTodo(newTask);

console.log(newTask);

displayTodo(myTask);
displayTodo(newTask);