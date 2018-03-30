var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/todos.controller')
var TodoService = require('../services/todos.service')

/* GET home page. */
// router.get('/', function (req, res) {
//   TodoController.getTodos();
//   res.render('index', { appTitle: 'Todo App', status: false, listTodos: JSON.stringify(todos) });
// });

router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.get('/', (_, res) => {
  var promise = TodoService.getTodos({}, 1, 100);
  promise.then(function (data) {
    res.render('index', { appTitle: 'Todo App', status: false, listTodos: data.docs });
  });
});

router.post('/', function (req, res, next) {
  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }
  TodoService.createTodo(todo).then(function (d) {
    var promise = TodoService.getTodos({}, 1, 100);
    promise.then(function (data) {
      res.render('index', { appTitle: 'Todo App', status: true, listTodos: data.docs });
    });
  });
});

module.exports = router;
