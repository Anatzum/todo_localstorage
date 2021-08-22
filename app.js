class Todo {
  constructor(description, category, priority) {
    this.description = description;
    this.category = category;
    this.priority = priority;
  }
}

class UI {
  static displayTodos() {
    const todos = Store.getTodos();

    todos.forEach((todo) => {
      UI.addTodoRow(todo);
    });
  }

  static addTodoRow(todo) {
    const todoTbody = document.querySelector('#todo-tbody');
    const row = document.createElement('tr');
    row.classList.add('d-flex');
    row.innerHTML = `
      <td class="col border">${todo.description}</td>
      <td class="col-1 border">${todo.category}</td>
      <td class="col-1 border">${todo.priority}</td>
      <td class="col-1 border">
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;

    todoTbody.appendChild(row);
  }

  static removeTodoRow(el) {
    console.log(el);
  }

  static showAlert(message, type) {
    const div = document.createElement('div');
    div.classList.add('alert', `alert-${type}`, 'px-4', 'mt-4', 'mx-5');
    div.setAttribute('role', 'alert');
    div.appendChild(document.createTextNode(message));

    const form = document.querySelector('#todo-form');
    form.parentElement.insertBefore(div, form);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}

class Store {
  static getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'))
    }

    return todos;
  }

  static addTodo(todo) {
    const todos = Store.getTodos();
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static deleteTodo(description) {
    console.log(description);
  }
}


// Event : Display Todos
document.addEventListener('DOMContentLoaded', UI.displayTodos);

// Event : Add a Todo
document.querySelector("#todo-form").addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.querySelector('#description').value;
  const category = document.querySelector('#category').value;
  const priority = document.querySelector('#priority').value;

  if (!description || !category || !priority) {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const todo = new Todo(description, category, priority);

    Store.addTodo(todo);
    UI.addTodoRow(todo);

    UI.showAlert('Todo Added', 'success');

    e.target.reset();
  }
});

// Event : Remove a Todo
