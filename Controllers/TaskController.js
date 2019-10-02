class TaskController{
    constructor(model, view){
        this.model = model;
        this.view = view;
    
        this.init();
    }
    init() {
        this.createChildren()
            .setupHandlers()
            .enable();
    }
    createChildren() {
        // no need to create children inside the controller
        // this is a job for the view
        // you could all as well leave this function out
        return this;
    }
    setupHandlers() {

        this.addTaskHandler = this.addTask.bind(this);
        this.selectTaskHandler = this.selectTask.bind(this);
        this.unselectTaskHandler = this.unselectTask.bind(this);
        this.completeTaskHandler = this.completeTask.bind(this);
        this.deleteTaskHandler = this.deleteTask.bind(this);
        return this;
    }
    enable() {

        this.view.addTaskEvent.attach(this.addTaskHandler);
        this.view.completeTaskEvent.attach(this.completeTaskHandler);
        this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
        this.view.selectTaskEvent.attach(this.selectTaskHandler);
        this.view.unselectTaskEvent.attach(this.unselectTaskHandler);

        return this;
    }
    addTask(sender, args) {
        this.model.addTask(args.task);
    }
    selectTask(sender, args) {
        this.model.setSelectedTask(args.taskIndex);
    }
    unselectTask(sender, args) {
        this.model.unselectTask(args.taskIndex);
    }
    completeTask() {
        this.model.setTasksAsCompleted();
    }
    deleteTask() {
        this.model.deleteTasks();
    }
}