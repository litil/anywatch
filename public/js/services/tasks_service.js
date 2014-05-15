/**
 * This method add the given task into the list view.
 *
 * @param taskObject represents a task
 */
function addTaskToListView(taskObject, taskObjectId){
    var taskListContainer = $('#tasks_list_container');

    taskListContainer.prepend('' +
        '<div class="col-md-4 ">' +
            ' <div class="task_container">' +
                '<div id="title_delete" class="row">' +
                    '<div class="col-md-9">' +
                        '<a href="'+taskObject.url+'"><b>'+taskObject.title+'</b></a>' +
                    ' </div>' +
                    '<div class="col-md-3 pull-right">' +
                        '<a href="#">delete</a>' +
                    '</div>' +
                '</div>' +
                '<div id="rating_container" class="row">' +
                    '<div class="col-md-12">' +
                        '<ul id="'+taskObjectId+'" class="rating">' +
                            '<li><a href="#" class="rating_link">This is just a piece of crap</a></li>' +
                            '<li><a href="#" class="rating_link">Nothing too new or interesting</a></li>' +
                            '<li><a href="#" class="rating_link">Not bad, I like it</a></li>' +
                            '<li><a href="#" class="rating_link">I would like to see more of this</a></li>' +
                            '<li><a href="#" class="rating_link">This is the best thing I ve seen</a></li>' +
                        '</ul>' +
                    ' </div>' +
                '</div>' +
                '<div id="description" class="row">' +
                    '<div class="col-md-12">' +
                        '<i>added by <b>' + taskObject.author + '</b> on ' + taskObject.creation_datetime.toLocaleDateString("en-US") + '</i>' +
                    '</div>' +
                ' </div>' +
            '</div> ' +
        '</div>');



    // Variable to set the duration of the animation
    var animationTime = 500;

    // Variable to store the colours
    var colours = ["fffebe", "ffee55", "ffc044", "ff872f", "ff2f0d"];

    // Function to colorize the right ratings
    var colourizeRatings = function(nrOfRatings, ulList) {
        debugger;
        ulList.children().each(function() {
            if($(this).parent().index() <= nrOfRatings) {
                $(this).stop().animate({ backgroundColor : "#" + colours[nrOfRatings] } , animationTime);
            }
        });
    };

    // Handle the hover events
    $(".rating li a").hover(function() {
        // Call the colourize function with the given index
        //colourizeRatings($(this).parent().index(), $(this).parent().parent());

        var ulList = $(this).parent().parent();
        var hoveredIndex = $(this).parent().index();

        ulList.children().each(function() {
            if($(this).index() <= hoveredIndex) {
                //debugger;
                $(this).children(":first").css('background-color', "#" + colours[hoveredIndex] );
                //$(this).stop().animate({ backgroundColor : "#" + colours[hoveredIndex] } , animationTime);
            } else {
                $(this).children(":first").css('background-color', "#ebebeb");
            }
        });

    }, function() {
        // Restore all the rating to their original colours
        $(this).children(":first").css('background-color', "#ebebeb");
        //$("#rating li a").stop().animate({ backgroundColor : "#333" } , animationTime);
    });

    // Prevent the click event and show the rating
    $(".rating li a").click(function(e) {
        e.preventDefault();

        // get the taskObject id
        var taskObjectId = $(this).parent().parent().attr('id');
        var rating_index = $(this).parent().index();

        // update the task object
        Parse.initialize("k7LH6ot3F4efRvDpv59WynbAuoGkyQLWws4vzPFM", "nrmXLz8TW07tKY7JmhB53xYcJXM5G66HJLfuG4b6");
        var TaskObject = Parse.Object.extend("TaskObject");
        var taskObject = new TaskObject();
        taskObject.id = taskObjectId;
        taskObject.set("rating", rating_index);

        taskObject.save(null, {
            success: function(point) {
                // Saved successfully.
                debugger;
            },
            error: function(point, error) {
                // The save failed.
                // error is a Parse.Error with an error code and description.
                debugger;
            }
        });
    });

    // get the current ul
    var ulList = $('#'+taskObjectId+'');
    var currentRating = taskObject.rating;
    console.log(currentRating);
    colourizeRatings(currentRating, ulList);
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
                addTaskToListView(taskEntry.attributes, taskEntry.id);
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
    taskObject.set("rating", -1);

    taskObject.save(null, {
        success: function(taskObject) {
            // the task has been saved, update the tasks list
            addTaskToListView(taskObject.attributes, taskObject.id);
        },
        error: function(taskObject, error) {
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);
        }
    });

}
