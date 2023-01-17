const express = require("express");
const bodyParser = require("body-parser");

// Modelo
class TodoModel {
  constructor() {
    this.todos = [];
  }

  addTodo(todoText) {
    const todo = {
      text: todoText,
      completed: false,
    };
    this.todos.push(todo);
  }

  editTodo(index, todoText) {
    this.todos[index].text = todoText;
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }

  toggleTodo(index) {
    this.todos[index].completed = !this.todos[index].completed;
  }
}

// Usuario
class UserModel {
  constructor() {
    this.arrayUsuarios = [];
  }

  addUser(username, password, age) {
    const usuarioNuevo = {
      userName: username,
      password: password,
      age: age
    };
    this.arrayUsuarios.push(usuarioNuevo);
  }

  editUser(index, usuarioEditado) {
    this.arrayUsuarios[index] = usuarioEditado;
  }

  deleteUser(index) {
    this.arrayUsuarios.splice(index, 1);
  }

  getUsers(){
    return this.arrayUsuarios;
  }

  getPromedio(){
    let acumulador = 0;
    this.arrayUsuarios.forEach((someUser) => {
      acumulador = acumulador + someUser.age;
    })
    if(this.arrayUsuarios.length != 0)
    {
      const promedio = acumulador/this.arrayUsuarios.length 
      return {promedio}
    }
    return {promedio: 0}
    
  }

}

// Controlador
class TodoController {
  constructor(model) {
    this.model = model;
  }

  addTodo(todoText) {
    this.model.addTodo(todoText);
  }

  editTodo(index, todoText) {
    this.model.editTodo(index, todoText);
  }

  deleteTodo(index) {
    this.model.deleteTodo(index);
  }

  toggleTodo(index) {
    this.model.toggleTodo(index);
  }
}

class UsuariosController {
  constructor(model) {
    this.model = model;
  }

  addUser(username, password, age) {
    this.model.addUser(username, password, age);
  }

  editUser(index, newUser) {
    this.model.editUser(index, newUser);
  }

  deleteUser(index) {
    this.model.deleteUser(index);
  }

  getUsers() {
    this.model.getUsers();
  }
}

// Vistas (Rutas)
const app = express();
const todoModel = new TodoModel();
const todoController = new TodoController(todoModel);

const userModel = new UserModel();
const userController = new UsuariosController(userModel);

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  res.send(todoController.model.todos);
});

app.get("/usuarios", (req, res) => {
  res.send(userController.model.arrayUsuarios);
});

// Vistas (Rutas) (continuación)
app.post("/todos", (req, res) => {
  const todoText = req.body.text;
  console.log(req.body)
  todoController.addTodo(todoText);
  res.sendStatus(200);
});

app.post("/usuarios", (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  userController.addUser(username, password, age);
  res.sendStatus(200);
});

app.put("/todos/:index", (req, res) => {
  const index = req.params.index;
  const todoText = req.body.text;
  todoController.editTodo(index, todoText);
  res.sendStatus(200);
});

app.put("/usuarios/:index", (req, res) => {
  const index = req.params.index;
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  const newUser = {
    username,
    password,
    age,
  }
  userController.editUser(index, newUser);
  res.sendStatus(200);
});

app.delete("/todos/:index", (req, res) => {
  const index = req.params.index;
  todoController.deleteTodo(index);
  res.sendStatus(200);
});

app.delete("/usuarios/:index", (req, res) => {
  const index = req.params.index;
  userController.deleteUser(index);
  res.sendStatus(200);
});

app.get("/usuarios-promedio", (req, res) => {
  res.send(userController.model.getPromedio());
});

app.patch("/todos/:index", (req, res) => {
  const index = req.params.index;
  todoController.toggleTodo(index);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
