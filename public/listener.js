document.getElementById('button-primary').addEventListener('click', function() {
    Todo.addTodo();
});
document.getElementById('option').addEventListener('click', function() {
    Todo.toggleAll();
});
document.getElementById('button-change').addEventListener('click', function() {
    Todo.editTodo();
});
/*document.getElementById('button-display').addEventListener('click', function() {
    displayTodo();
});*/
document.getElementById('button-delete').addEventListener('click', function() {
    Todo.deleteAlltodo();
});