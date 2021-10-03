const express = require('express');
const router = express.Router();
const {list,nueva,recommended,detail, add, create, edit, update, destroy, remove} = require('../controllers/moviesController');

router
    .get('/', list)
    .get('/new', nueva) //no se usa new en el metodo porque es palabra reservada
    .get('/recommended', recommended)
    .get('/detail/:id', detail)
//Rutas exigidas para la creación del CRUD
    .get('/add', add)
    .post('/create', create)
    .get('/edit/:id', edit) //muestra el formulario
    .put('/update/:id', update) //trae datos para modificar la pelicula
    .get('/remove/:id', remove) //hay una vista previa antes de borrar  
    .delete('/delete/:id', destroy)
    


module.exports = router;
