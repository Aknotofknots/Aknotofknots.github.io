$(function() {
    let app = Object.create(TodoApp);

    function scrollToElement(el) {
        $("html, body").animate({
            scrollTop: $(el).offset().top
        }, 1500);
    }

    $("#scrolldown").click(function() {
        $todoHeader = $("#todos-header");
        scrollToElement($todoHeader);
    });

    $('[data-toggle="tooltip"]').tooltip();



    /**** toggle one todo completed*****/
    $("#modaltogglebutton").on("click", function() {

        $.each(app.todos, function(index, object) {
                $completed = object.completed ? true : false;
                if(app.todoParentElementId === index) {
                if (!$completed) {
                    object.completed = !object.completed;
                    $("#modaltogglebutton").addClass("btn-success");
                } else {
                    object.completed = !object.completed;
                    $("#modaltogglebutton").removeClass("btn-success");
                }
            }
        });

    });



    /**** Toggle all todos completed and add some css to indicate status****/

    $("#checkbox").change(function() {
        $checked = this.checked ? true : false;

        if ($checked) {

            $nrOfCompletedTodos = 0;
            $liElements = $("#displaytodolist").children().css("text-decoration", "line-through");
            $liElements = $("#displaytodolist").children().css("font-weight", "bold");
            $.each(app.todos, function(index, object) {
                if (object.completed)
                    $nrOfCompletedTodos++;

                    if ($nrOfCompletedTodos === app.todos.length)
                        object.completed = false;
                    else
                        object.completed = true;
            });
        } else {
            $liElements.css("text-decoration", "none");
            $.each(app.todos, function(index, object) {
                object.completed = false;
            });
        }
    });



    /**** change the description of the todo on modal dimiss bootstrap event ***/

    $("#todo-modal").on("hide.bs.modal", function() {

        $.each(app.todos, function(index, object) {
            if (app.todoParentElementId === index) {
                object.todoDescription = $(".modal-body").text();
            }
        });
    });

});
