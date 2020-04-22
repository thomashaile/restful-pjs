debugger;
var Todo = {

    //adding new todo
    addTodo: async function() {
        var text = document.getElementById("input-add");
        var todoText = (text.value);
        const newTodo = { todoText: todoText, completed: false };
        fetch('/todos', {
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .catch(err => console.log('response', err));
        UI.displayTodo();
    },

    //updating to do using patch
    editTodo: async function() {
        var text = document.getElementById("update-input").value;
        var position = document.getElementById("position").value;
        const updateTodo = 'updating todo with PATCH';
        fetch(`/todos/${position}`, {
                method: 'PATCH',
                body: JSON.stringify({ todoText: text }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .catch(err => console.log('response', err));
        UI.displayTodo();
    },

    //single toggle element
    toggleTodo: async function(position) {

        const res = await fetch(`/todos/${position}`);
        const data = await res.json();

        if (data.completed === true) {
            // set completed to false
            fetch(`/todos/${position}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: false }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => res.json())

        } else {
            //else change to true
            fetch(`/todos/${position}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: true }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => res.json())
        }

        UI.displayTodo();
    },


    //deleting single todo
    deleteTodo: async function(position) {
        try {
            const res = fetch(`/todos/${position}`, { method: 'DELETE' });
            const data = await res.json();
        } catch (err) {
            console.log('response', err);
        };
        UI.displayTodo();
    },

    //toggle all 
    toggleAll: async function() {
        try {
            const res = await fetch('/todos');
            const data = await res.json();

            var totalTodos = data.length;
            var completedTodos = 0;
            data.forEach(element => {
                if (element.completed === true) {
                    completedTodos++;
                } else {
                    //completedTodos;
                }
            });

            //case 1: if everything is true make everything false
            if (completedTodos === totalTodos) {
                for (let todo of data) {
                    const res = await fetch(`/todos/${todo.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ completed: false }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    });
                    const data = await res.json();
                };
            }

            //case2: else make everything true
            else {
                for (let todo of data) {
                    const res = await fetch(`/todos/${todo.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ completed: true }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    });
                    const data = await res.json();
                };
            }
        } catch (err) {
            console.log('response', err);
        };
        UI.displayTodo();
    },


    // delete all
    async deleteAlltodo() {
        try {
            const res = await fetch('/todos');
            const data = await res.json();
            for (let todo of data) {
                const res = await fetch(`/todos/${todo.id}`, {
                    method: 'DELETE'
                });
                const data = await res.json();
            };
        } catch (err) {
            console.log('response', err);
        };
        UI.displayTodo();
    }
}