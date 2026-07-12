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

   function markComplete(newStatus) {
      todo.doneStatus = newStatus;
   }

   return todo, {changePriority, markComplete};
   }

export { defaultProjects, createTodo };