var UI = {

    //display all
    async displayTodo() {
        const start = Date.now();
        const timedMsg = (msg) => `${Date.now() - start} ms.: ${msg}`;
        const fetchingAllOld = 'display all todos';
        try {
            const res = await fetch('/todos');
            const data = await res.json();
            console.log(timedMsg('response' + fetchingAllOld), data);

            var todosUl = document.querySelector('ul');
            todosUl.innerHTML = '';

            //return data;
            for (let todo of data) {
                //alert(JSON.stringify(todo.id));
                var todoli = document.createElement('li');
                var todoTextWithC = '';
                if (todo.completed === true) {
                    todoTextWithC = '(x)' + " " + todo.todoText;
                } else {
                    todoTextWithC = '( )' + " " + todo.todoText;
                }

                todoli.id = todo.id;
                todoli.textContent = todoTextWithC;
                todoli.appendChild(this.createDeletebutton());
                todoli.appendChild(this.createTogglebutton());
                todosUl.appendChild(todoli);
            }
            return todosUl;
        } catch (err) {
            console.log(timedMsg('response' + fetchingAllOld), err);
        };
    },
    //create delete button
    createDeletebutton() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = 'deletButton';
        return deleteButton;
    },
    createTogglebutton() {
        var toggleButton = document.createElement('button');
        toggleButton.textContent = "Done";
        toggleButton.className = 'toggleButton';
        return toggleButton;
    }
}
window.onload = () => {
    document.querySelector('ul')
        .onclick = (event) => {
            var elementClicked = event.target;
            if (elementClicked.className === 'deletButton') {
                Todo.deleteTodo(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'toggleButton') {
                Todo.toggleTodo(parseInt(elementClicked.parentNode.id));
            }
        }

};