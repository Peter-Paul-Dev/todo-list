class Todo {
   constructor(title, description, dueDate, priority, doneStatus, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.doneStatus = doneStatus;
        this.notes = notes;
   }

   changePriority(newPrio) {
      this.priority = newPrio;
   }

   markComplete(updateStatus) {
      this.doneStatus = updateStatus;
   }
}

export {Todo};