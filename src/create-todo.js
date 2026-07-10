class Todo {
   constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
   }

   createTodo(title, description, dueDate, priority, notes) {
        let newTodo = new Todo(title, description, dueDate, priority, notes);
   }
}

export {Todo};