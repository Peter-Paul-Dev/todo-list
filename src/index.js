import "./style.css";
import { myTodos, createTodo } from "./todo-logic.js";


const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

console.log(myTask);
console.log(myTodos);