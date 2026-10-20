function saveToLocalStorage (target) {
   localStorage.setItem(target.title, JSON.stringify(target));
}

function removeFromLocalStorage(target) {
   localStorage.removeItem(target.title);
}

function getFromLocalStorage(target) {
   const jsonString = localStorage.getItem(target.title);

   if (jsonString) {
      const parsedString = JSON.parse(jsonString);

      return parsedString;
   } 
   
   else {
      const nothingWasFound = "Nothing Was Found"

      console.warn("No object found with that key");
      return nothingWasFound;
   }
}

function findMatch(target, arr) {
    if (!arr || arr.list.length === 0) {
       console.warn(`findMatch failed: Array for "${target}" is empty or undefined.`);
   }
   
   const match = arr.list.find((item) => item.title == target);

   if (!match) {
       console.warn(`findMatch failed: No object found with title "${target}".`);
   }

   return match;
}

const allTodos = (function () {
   const hardCodedAllTodos = {
      title: "All Tasks",
      list: [],
   }

   const insideLocalStorageTodos = getFromLocalStorage(hardCodedAllTodos);

   if (insideLocalStorageTodos == hardCodedAllTodos || insideLocalStorageTodos == "Nothing Was Found") {
      return hardCodedAllTodos;
   } 
   
   else {
      return insideLocalStorageTodos;
   }
})();

const workingTodoList = {
   title: "All Tasks",
   list: allTodos.list.map(item => createTodo(item.title, item.description, item.dueDate, item.priority, item.notes, item.isComplete)),
}
saveToLocalStorage(workingTodoList);

const allProjects = (function() {
   const hardCodedAllProjects = {
   title: "All Projects",
   list: [allTodos],
   }

   const insideLocalStorageProjs = getFromLocalStorage(hardCodedAllProjects);

   if (insideLocalStorageProjs == hardCodedAllProjects || insideLocalStorageProjs == "Nothing Was Found") {
   return hardCodedAllProjects;
   } 

   else {
   return insideLocalStorageProjs;
   } 
})();

const workingProjectList = {
   title: "All Projects",
   list: [workingTodoList, ...allProjects.list.slice(1).map((item) => createNewProject(item.title))],
}
saveToLocalStorage(workingProjectList);

workingTodoList.deleteTodo = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, workingTodoList);
      const todoIndex = workingTodoList.list.findIndex((item) => item.title == targetTodo.title);

      targetTodo.removeFromParents();
      targetTodo.parentProjects = [];
      workingTodoList.list.splice(todoIndex, 1);
      removeFromLocalStorage(targetTodo);
      saveToLocalStorage(workingTodoList);
}

workingProjectList.deleteProject = function(targetTitle) {
      const targetProject = findMatch(targetTitle, workingProjectList);
      const projIndex = workingProjectList.list.findIndex((arr) => arr.title == targetProject.title);

      if (targetProject.title == "All Tasks") {
         console.warn("You can't delete that");
      } 
      
      else {
         workingProjectList.list.splice(projIndex, 1);
         removeFromLocalStorage(targetProject);
         saveToLocalStorage(workingProjectList);
      }
}  

function createTodo(title, description, dueDate, priority, notes, isComplete) {
   const todo = {
      title: title,
      dueDate: dueDate,
      description: description,
      priority: priority,
      notes: notes,
      parentProjects: ["All Tasks"],
      isComplete: isComplete,
   };

   todo.changePriority = function() {
      if (todo.priority == "Not urgent") {
         return todo.priority = "Urgent"
      } 
      
      else if (todo.priority == "Urgent") {
         return todo.priority = "Not urgent"
      }
   }

   todo.changeCompleteStatus = function(newStatus) {
      return todo.isComplete = newStatus;
   }

   todo.removeFromParents = function() {
      const projectsBesidesAllTasks = workingProjectList.list.slice(1);

      projectsBesidesAllTasks.forEach(arr => {
         const targetParentProj = arr.title;
         const todoParentProjs = todo.parentProjects;
         
         if (todoParentProjs.includes(targetParentProj) == true) {
           return arr.removeTodoFromProject(todo.title);
         }
      });
   }
   
   return todo;
}

function createNewProject(newProj) {
   const proj = {
      title: newProj,
      list: [],
   }

   proj.removeTodoFromProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, proj);
      const todoIndex = proj.list.findIndex((item) => item == targetTodo);

      const todoParentProjs = targetTodo.parentProjects;
      const parentProjIndex = todoParentProjs.findIndex((item) => item == proj.title);   

      proj.list.splice(todoIndex, 1);
      todoParentProjs.splice(parentProjIndex, 1);
      saveToLocalStorage(workingProjectList);
   }  

   proj.addToProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, workingTodoList);
      proj.list.push(targetTodo);
      targetTodo.parentProjects.push(proj.title);
   }

   return proj;
}   

export { allTodos, allProjects, workingTodoList, workingProjectList, saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, findMatch, createTodo, createNewProject };