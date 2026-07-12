const defaultProjects = [];

function createTodo(title, description, dueDate, priority, doneStatus, notes) {
   const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      doneStatus: doneStatus,
      notes: notes,
   };

   defaultProjects.push(todo);

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
   return newProj = [];
}   

export { defaultProjects, createTodo, createNewProject };