const allTodos = [];
allTodos.title = "allTodos";

const allProjects = [allTodos];

allTodos.removeTodo = function(obj) {
      const targetTodo = obj.title;
      const matchedTodo = allTodos.findIndex((item) => item.title == targetTodo);

      obj.removeFromParents();
      obj.parentProjects = [];
      allTodos.splice(matchedTodo, 1);
}

allProjects.removeProject = function(arr) {
      const targetProject = arr.title;
      const matchedProj = allProjects.findIndex((arr) => arr.title == targetProject);

      allProjects.splice(matchedProj, 1);
}  

function createTodo(title, description, dueDate, priority, doneStatus, notes) {
   const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      doneStatus: doneStatus,
      notes: notes,
      parentProjects: ["allTodos"],
   };

   todo.changePriority = function(newPrio) {
      todo.priority = newPrio;
   }

   todo.markComplete = function(newStatus) {
      todo.doneStatus = newStatus;
   }

   todo.removeFromParents = function() {
      const projectsBesidesAllTodos = allProjects.slice(1);

      projectsBesidesAllTodos.forEach(arr => {
         const targetParentProj = arr.title;
         const todoParentProjs = todo.parentProjects;
         //if any element in parentProjects is == item.title, run item.removeTodoFromProject(obj)
         
         if (todoParentProjs.includes(arr.title) == true) {
            arr.removeTodoFromProject(todo);
            return arr;
         }
      });
   }

   allTodos.push(todo);
   return todo;
}

function createNewProject(newProj) {
   const proj = [];
   proj.title = newProj;

   proj.removeTodoFromProject = function(obj) {
      const targetTodo = obj.title;
      const matchedTodo = proj.findIndex((item) => item.title == targetTodo);

      const todoParentProjs = obj.parentProjects;
      const matchedParentProj = todoParentProjs.findIndex((item) => item == proj.title);   

      proj.splice(matchedTodo, 1);
      obj.parentProjects.splice(matchedParentProj, 1);
   }  

   proj.addToProject = function(obj) {
      proj.push(obj);
      obj.parentProjects.push(proj.title);
   }

   allProjects.push(proj);
   return proj;
}   

export { allTodos, allProjects, createTodo, createNewProject };