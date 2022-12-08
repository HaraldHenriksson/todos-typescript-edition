import 'bootstrap/dist/css/bootstrap.css'
import './style.css'


const todosList = document.querySelector('#todos')!
const newTodoForm = document.querySelector('#new-todo-form')!

type Todo = {
  id: number,
  title: string,
  completed: boolean,
}

const todos: Todo[] = [
  {
    id: 1,
    title: "Learn basic javascript",
    completed: true,
  },
  {
    id: 2,
    title: "Learn advanced javascript",
    completed: true,
  },
  {
    id: 3,
    title: "Learn basic typescript",
    completed: false,
  }
];
console.log(todos)

const renderTodos = () => {
  todosList.innerHTML = '';

 // const listitems = todos.map(todo => `<li class="list-group-item">${todo}</li>`)

 // const output = todos.map(todo => `<li class="list-group-item">${todo}</li>`).join('');

 //CLEAN SHORT WAY
  todosList.innerHTML = todos
      .map(todo => 
          `<li class="list-group-item ${todo.completed ? 'completed': ''}" data-todo-id="${todo.id}">
                ${todo.title}
            </li>`
            )
            .join('');
}

newTodoForm.addEventListener('submit', e => {
e.preventDefault()

const newTodoTitle = document.querySelector<HTMLInputElement>('#new-todo-title')?.value || '';
if (newTodoTitle.length < 3) {
  alert("Too short todo");
  return
}

const todoIds = todos.map(todo => todo.id)
const maxId = Math.max(...todoIds)

const newTodo: Todo = {
  id: maxId +1,
  title: newTodoTitle,
  completed: false,
 }
 todos.push(newTodo)

document.querySelector<HTMLInputElement>('#new-todo-title')!.value = '';

renderTodos();
})

todosList.addEventListener('click', e => {
  const target = (e.target as HTMLElement)

  if (target.tagName === "LI") {
    const todoId = Number(target.dataset.todoId)

   const foundTodo = todos.find(todo => todo.id === todoId)

    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed
    }

    renderTodos();
  }
})

renderTodos();