class TaskView{
    constructor(model){
        this.model = model;
        this.addTaskEvent = new Event(this);
        this.selectTaskEvent = new Event(this);
        this.unselectTaskEvent = new Event(this);
        this.completeTaskEvent = new Event(this);
        this.deleteTaskEvent = new Event(this);
    
        this.init();
    }
    init() {
        this.createChildren();
        this.prepareChildren();
        this.setupHandlers();
        this.enable();
    }
    createChildren() {
        // cache the document object
        this.$container = document.createElement("div");
        this.$addTaskButton = document.createElement("input");
        this.$taskTextBox = document.createElement("input");
        this.$tasksContainer = document.createElement("div"); // holds all the tasks.

        this.$completeTaskButton = document.createElement("input");
        this.$deleteTaskButton = document.createElement("input");

        return this;
    }
    createTask(task, index){
        // create label
        let container = document.createElement("Label");
        // add checkbox
        let currentTaskCheckbox = document.createElement("input");
        currentTaskCheckbox.setAttribute("type", "checkbox");
        currentTaskCheckbox.setAttribute("data-index", index);
        currentTaskCheckbox.setAttribute("data-task-selected", false);
        currentTaskCheckbox.addEventListener("click", this.selectOrUnselectTaskHandler);

        container.innerHTML = task.taskName;
        container.prepend(currentTaskCheckbox);

        return container;
    }
    prepareChildren(){
        this.$addTaskButton.setAttribute("type", "button");
        this.$addTaskButton.setAttribute("value", "Add Task");

        this.$completeTaskButton.setAttribute("type", "button");
        this.$completeTaskButton.setAttribute("value", "Complete Tasks");

        this.$deleteTaskButton.setAttribute("type", "button");
        this.$deleteTaskButton.setAttribute("value", "Delete Tasks");

        this.$container.appendChild(this.$addTaskButton);
        this.$container.appendChild(this.$taskTextBox);
        this.$container.appendChild(this.$tasksContainer);
        this.$container.appendChild(this.$completeTaskButton);
        this.$container.appendChild(this.$deleteTaskButton);


        return this;
    }
    setupHandlers() {

        this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
        this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
        this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.addTaskHandler = this.addTask.bind(this);
        this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
        this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
        this.deleteTasksHandler = this.deleteTasks.bind(this);

        return this;
    }
    enable() {

        this.$addTaskButton.addEventListener("click", this.addTaskButtonHandler);
        this.$completeTaskButton.addEventListener("click", this.completeTaskButtonHandler);
        this.$deleteTaskButton.addEventListener("click", this.deleteTaskButtonHandler);

        
        //this.$container.on('click', '.js-task', this.selectOrUnselectTaskHandler);

        /**
         * Event Dispatcher
         */
        this.model.addTaskEvent.attach(this.addTaskHandler);
        this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
        this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
        this.model.deleteTasksEvent.attach(this.deleteTasksHandler);

        return this;
    }
    getVisualHTML(){
        return this.$container;
    }
    addTaskButton() {
        this.addTaskEvent.notify({
            task: this.$taskTextBox.value
        });
    }
    completeTaskButton() {
        this.completeTaskEvent.notify();
    }
    deleteTaskButton() {
        this.deleteTaskEvent.notify();
    }
    selectOrUnselectTask() {
        let taskIndex = event.target.getAttribute("data-index");
        //$(event.target).attr("data-index");
        
        if (event.target.getAttribute('data-task-selected') == 'false') {
            event.target.getAttribute('data-task-selected', true);
            this.selectTaskEvent.notify({
                taskIndex: taskIndex
            });
        } else {
            event.target.getAttribute('data-task-selected', false);
            this.unselectTaskEvent.notify({
                taskIndex: taskIndex
            });
        }
    }
    show() {
        this.buildList();
    }
    buildList() {
        let tasks = this.model.getTasks();

        this.$tasksContainer.innerHTML = ''; // empty the task list
        
        let index = 0;
        for (let task in tasks) {   // for every task
            let currentTask = document.createElement("div");    // holder of everything task
            if (tasks[task].taskStatus == 'completed') {
                currentTask.setAttribute("style", "color:green;text-decoration:line-through;");
            }
            currentTask.appendChild(this.createTask(tasks[task], index));
            this.$tasksContainer.appendChild(currentTask);

            index++
        }

    }
    /* -------------------- Handlers From Event Dispatcher ----------------- */

    clearTaskTextBox() {
        this.$taskTextBox.value = '';
    }
    addTask() {
        this.show();
    }
    setTasksAsCompleted() {
        this.show();
    }
    deleteTasks() {
        this.show();
    }
    /* -------------------- End Handlers From Event Dispatcher ----------------- */


}