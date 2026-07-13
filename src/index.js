import "./style.css";
import { allTodos, createTodo, createNewProject } from "./todo-logic.js";

const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

myTask.changePriority("Urgent");
myTask.markComplete("Done");

console.log(allTodos);

const newArr = createNewProject("newArr");
console.log(newArr);

const newTask = createTodo("Test stuff", "Finish testing stuff", "When I feel like it", "Not urgent", "Not done", "None");
console.log(newTask.todo);

newTask.addToProject(newArr);