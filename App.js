(function() {    
    let model = new Task();
    let view = new TaskView(model);
    let controller = new TaskController(model, view);

    document.body.appendChild(view.getVisualHTML());
})();