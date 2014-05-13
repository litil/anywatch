/**
 * This method add the given task into the list view.
 *
 * @param taskObject represents a task
 */
function addTaskToListView(taskObject){
    var ulList = $('#task_list');
    ulList.prepend('' +
        '<li>' +
            '<span id="taskTitle">'+taskObject.title+'</span>' +
            '<span id="taskInfos" class="pull-right"> ' +
                'added by <b>' + taskObject.author + '</b>' +
            '</span>' +
            '<br />' +
            '<a id="taskUrl" href="'+taskObject.url+'" target="_blank">' +
                taskObject.url +
            '</a>' +
            '<span id="taskInfos" class="pull-right"> ' +
                taskObject.creation_datetime.toLocaleDateString("en-US") +
            '</span>' +
        '</li>');
}


/**
 * This method loads the tasks from Parse and
 * display them into the list view.
 */
function loadTasks() {
    // Initialize the Parse object first.
    Parse.initialize("k7LH6ot3F4efRvDpv59WynbAuoGkyQLWws4vzPFM", "nrmXLz8TW07tKY7JmhB53xYcJXM5G66HJLfuG4b6");

    // create a TaskObject Collection
    var TaskObject = Parse.Object.extend("TaskObject");
    var TaskCollection = Parse.Collection.extend({
        model: TaskObject
    });
    var collection = new TaskCollection();

    // fetch the collection of tasks
    collection.fetch({
        success: function(collection) {
            var tasksArray = collection.models;
            tasksArray.forEach(function(taskEntry) {
                addTaskToListView(taskEntry.attributes);
            });
        },
        error: function(collection, error) {
            // The collection could not be retrieved.
        }
    });
}


/**
 * This method tries to add a new task.
 *
 * If one of the parameters is not valid, we return a message to
 * be displayed. For now, the only parameter to be mandatory is the
 * title. If the author is null, we set it to Anonymous.
 *
 * @param author
 * @param title
 * @param url
 *
 * @returns {string}
 */
function saveTask(author, title, url){
    // checking the truthy value
    if (!title) {
        return "You must enter a title"
    }
    if (!url){
        // we do not care, it is not compulsory
    }
    if (!author){
        author = "Anonymous";
    }

    // initialize the task object
    Parse.initialize("k7LH6ot3F4efRvDpv59WynbAuoGkyQLWws4vzPFM", "nrmXLz8TW07tKY7JmhB53xYcJXM5G66HJLfuG4b6");
    var TaskObject = Parse.Object.extend("TaskObject");
    var taskObject = new TaskObject();

    // set the data into the object
    taskObject.set("author", author);
    taskObject.set("title", title);
    taskObject.set("url", url);
    taskObject.set("creation_datetime", new Date());

    taskObject.save(null, {
        success: function(taskObject) {
            // the task has been saved, update the tasks list
            addTaskToListView(taskObject.attributes);
        },
        error: function(taskObject, error) {
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);
        }
    });

}
