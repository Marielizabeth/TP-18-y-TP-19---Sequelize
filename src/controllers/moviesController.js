const db = require('../database/models');
const {Op} = require('sequelize');

////Otra forma de llamar a los modelos: const Movies = db.Movie;
///const moviesController = {}

module.exports = {
    list : (req,res) => {
        db.Pelicula.findAll() //usa el alias del modelo
            .then(movies => {
                return res.render('moviesList',{
                    movies
                })
            })
            .catch(error => console.log(error))
    },

    nueva : (req,res) => {
        db.Pelicula.findAll({
            order:[
                ['release_date', 'DESC'] //DESC; de los mas recientes a los mas antiguos
            ],
            limit: 5
        })
        .then(movies => res.render('newestMovies',{
            movies
        }))
        .catch(error => console.log(error)) 

    },

    recommended : (req,res) => {
        db.Pelicula.findAll({
            where : {
                awards: {
                    [Op.gte] : 8
                }

            }

    })
    .then(movies => res.render('recommendedMovies',{
        movies
    }))
    .catch(error => console.log(error)) 
    },

    detail : (req,res) => {
        db.Pelicula.findByPk(req.params.id)
        .then(movie => res.render('moviesDetail',{
            movie
        }))
        .catch(error => console.log(error))

    },

    add : (req,res) => { //renderiza un form donde se capturan los datos para crear la nueva pelicula
        return res.render('moviesAdd')
        //no hace falta mandar nada, solo que renderice el formulario
       
        
    },

    create: (req,res) => { //añade datos a la pelicula
       const {title, rating, awards, release_date, length } = req.body;
       db.Pelicula.create({
           title: title.trim(),
           rating,  
           awards,
           release_date,
           length
       })
       .then(movie => {     //cuando se crea un registro, sequelize siempre va a devolver ese registro
        res.redirect('/movies/detail/' + movie.id) //movie.id porque devuelve la pelicula ya guardada
       })
       .catch(error => console.log(error))
        
    },
    //los name del formulario y columnas de la base de datos que sean iguales.
    edit: function(req, res) {
        db.Pelicula.findByPk(req.params.id) //consulta por id que recibe por parametro y lo mando a la vista
        .then(Movie => res.render('moviesEdit',{
            Movie
        }))
        .catch(error => console.log(error))  
        
    },
    update: function (req,res) { //guarda los cambios. Update devuelve un array con 1 o con 0
        db.Pelicula.update(
            {
                ...req.body
            },
            {
                where : {
                    id : req.params.id
                }
            }         

        )
            .then( () => {
                res.redirect('/movies/detail/' + req.params.id)
            })
            .catch(error => console.log(error))  
    },     
    remove: (req, res) => {
        db.Pelicula.findByPk(req.params.id)
            .then(Movie => res.render('moviesDelete',{
                Movie
            }))
            .catch(error => console.log(error))   

    },
    destroy: function (req, res) {
        db.Pelicula.destroy(
            {
                where: {
                    id : req.params.id
                }
            }
        )
            .then(() => res.redirect ('/movies'))
            .catch(error => console.log(error))  
    }



}

//findAll devuelve un array. Similar al filter de js
//findOne devuelve un objeto, el primero que matchee,aunque varios coincidan siempre devuelve el primero 
//findByPk devuelve un objeto, unico porque es por id

//los ID y los timestamps sequelize los crea automaticamente

/* Otras formas de escribir el metodo create:
create: (req,res) => { //añade datos a la pelicula
    const {title, rating, awards, release_date, length } = req.body;
    db.Pelicula.create(
        {
        ...req.body,
        title: title.trim(),
        }
    )
    se pasan todas las propiedades de req.body y se escribe solamente la que corresponde. 
    
create: (req,res) => { 
    db.Pelicula.create(
        {
        ...req.body,
        title: req.body.title.trim(),        
        }
    )
    se pasan todas las propiedades de req.body y se escribe solamente la que corresponde.    
*/