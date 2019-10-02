class Task{
    constructor(){
        this.tasks = [];
        this.selectedTasks = [];
        this.addTaskEvent = new Event(this);
        this.setTasksAsCompletedEvent = new Event(this);
        this.deleteTasksEvent = new Event(this);
    }
    addTask(task) {
        this.tasks.push({
            taskName: task,
            taskStatus: 'uncompleted'
        });
        this.addTaskEvent.notify();
    }
    getTasks() {
        return this.tasks;
    }
    setSelectedTask(taskIndex) {
        this.selectedTasks.push(taskIndex);
    }
    unselectTask(taskIndex) {
        this.selectedTasks.splice(taskIndex, 1);
    }
    setTasksAsCompleted() {
        let selectedTasks = this.selectedTasks;
        for (let index in selectedTasks) {
            this.tasks[selectedTasks[index]].taskStatus = 'completed';
        }

        this.setTasksAsCompletedEvent.notify();

        this.selectedTasks = [];
    }
    deleteTasks() {
        let selectedTasks = this.selectedTasks.sort();

        for (let i = selectedTasks.length - 1; i >= 0; i--) {
            this.tasks.splice(this.selectedTasks[i], 1);
        }
        // clear the selected tasks
        this.selectedTasks = [];

        this.deleteTasksEvent.notify();

    }
}