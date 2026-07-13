const allTodos = [];
const allProjects = [allTodos];

function createTodo(title, description, dueDate, priority, doneStatus, notes) {
   const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      doneStatus: doneStatus,
      notes: notes,
   };

   allTodos.push(todo);

   function changePriority(newPrio) {
      todo.priority = newPrio;
   }

   function addToProject(arr) {
      arr.push(todo);
   }

   function markComplete(newStatus) {
      todo.doneStatus = newStatus;
   }

   return {todo, changePriority, addToProject, markComplete};
}

function createNewProject(newProj) {
   newProj = [];

   return newProj;
}   

export { allTodos, allProjects, createTodo, createNewProject };