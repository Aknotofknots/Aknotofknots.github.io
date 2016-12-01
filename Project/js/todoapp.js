let TodoApp = {

    todos: [],
    todoParentElementId: 0,

    addTodo: function(todo) {
        this.todos.push({
            todoText: todo,
            todoDescription: "",
            completed: false
        });
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.TodoView.displayTodos();
    },

    TodoView: {

        displayTodos: function() {
            let todos = TodoApp.todos;
            let modalBodyText = document.querySelector(".modal-body");
            let ulElement = document.getElementById("displaytodolist");
            ulElement.innerHTML = "";
            let documentFragment = document.createDocumentFragment();

            todos.forEach(function(todo, id) {
                let listElementItem = document.createElement("li");
                let contentElement = document.createElement("section");
                let removeButtonElement = document.createElement("button");
                let editButtonElement = document.createElement("button");
                let removeButtonGlyph = document.createElement("span");
                let editButtonGlyph = document.createElement("span");
                let textContentElement = document.createElement("span");
                let buttonContainerElement = document.createElement("div");

                listElementItem.classList.add("list-group");
                listElementItem.id = id;

                contentElement.classList.add("list-group-item");
                contentElement.id = "contentelement";
                textContentElement.textContent = todo.todoText;
                textContentElement.setAttribute("autofocus", "true");

                buttonContainerElement.id = "buttoncontainerelement";

                removeButtonElement.type = "button";
                removeButtonElement.classList.add("btn");
                removeButtonElement.classList.add("btn-xs");
                removeButtonElement.classList.add("btn-danger");
                removeButtonElement.id = "removebuttonelement";

                editButtonElement.type = "button";
                editButtonElement.setAttribute("data-toggle", "modal")
                editButtonElement.setAttribute("data-target", "#todo-modal");
                editButtonElement.classList.add("btn");
                editButtonElement.classList.add("btn-xs");
                editButtonElement.classList.add("btn-success");
                editButtonElement.classList.add("text-right");
                editButtonElement.id = "editbuttonelement";

                editButtonGlyph.classList.add("glyphicon");
                editButtonGlyph.classList.add("glyphicon-pencil");
                editButtonGlyph.id = "editbuttonglyph";

                removeButtonGlyph.classList.add("glyphicon");
                removeButtonGlyph.classList.add("glyphicon-remove");
                removeButtonGlyph.id = "removebuttonglyph";

                listElementItem.appendChild(contentElement);
                contentElement.appendChild(textContentElement);
                buttonContainerElement.appendChild(editButtonElement);
                buttonContainerElement.appendChild(removeButtonElement);
                contentElement.appendChild(buttonContainerElement);
                editButtonElement.appendChild(editButtonGlyph);
                removeButtonElement.appendChild(removeButtonGlyph);
                documentFragment.appendChild(listElementItem);
            }, this);
            modalBodyText.setAttribute("contentEditable", "true");
            ulElement.appendChild(documentFragment);
        },

        setUpEventListeners: function() {
            let todos = TodoApp.todos;
            let dispatcher = TodoApp.TodoControl;
            let modalBodyText = document.querySelector(".modal-body");
            let modalTitle = document.querySelector(".modal-title");
            let ulElement = document.querySelector("#displaytodolist");

            /* Event Delegation of clicks to parent ul element. listen for clicks on li children*/
            ulElement.addEventListener("click", function(event) {

                let target = event.target;
                let parent = target.parentNode.parentNode.parentNode;

                if (target.id === "editbuttonglyph" && parent.className === "list-group-item") {
                    parent = parent.parentNode;
                    TodoApp.todoParentElementId = parseInt(parent.id);

                    todos.forEach(function(todo, index) {
                        if (parseInt(parent.id) === index) {
                            modalBodyText.textContent = todo.todoDescription;
                            modalTitle.textContent = todo.todoText;
                        }
                    }, this);
                }

                if (target.id === "editbuttonelement" && parent.className === "list-group") {
                    TodoApp.todoParentElementId = parseInt(parent.id);

                    todos.forEach(function(todo, index) {
                        if (parseInt(parent.id) === index) {
                            modalBodyText.textContent = todo.todoDescription;
                            modalTitle.textContent = todo.todoText;
                        }
                    }, this);
                }

                if (target.id === "removebuttonglyph" && parent.className === "list-group-item") {
                    parent = parent.parentNode;
                    TodoApp.todoParentElementId = parseInt(parent.id);
                    dispatcher.deleteTodo(parseInt(parent.id));
                }

                if (target.id === "removebuttonelement" && parent.className === "list-group") {
                    TodoApp.todoParentElementId = parseInt(parent.id);
                    dispatcher.deleteTodo(parseInt(parent.id));
                }

            });

        }
    },

    TodoControl: {
        addTodo: function(e) {
            let todoInputField = document.querySelector("#todoinputfield");
            let todos = TodoApp.todos;
            if (!e) {
                e = window.event;
            }

            let keyPressed = e.which || e.keycode;

            if (e.code === 'Enter' || keyPressed === 13) {
                if (todoInputField.value !== "") {
                    TodoApp.addTodo(todoInputField.value);
                    todoInputField.value = "";
                    TodoApp.TodoView.displayTodos();
                }
                else
                    todoInputField.classList.add("bg-danger");

            }
        },

        deleteTodo: function(position) {
            TodoApp.deleteTodo(position);
        }
    }

};

TodoApp.TodoView.setUpEventListeners();
