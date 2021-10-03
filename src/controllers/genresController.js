const db = require('../database/models');



module.exports = {
    list : (req,res) => {
        db.Genero.findAll() //usa el alias del modelo
            .then(genres => {
                return res.render('genresList',{
                    genres
                })
            })
            .catch(error => console.log(error))
    },

        detail : (req,res) => {
        db.Genero.findByPk(req.params.id)
        .then(genre => res.render('genresDetail',{
            genre
        }))
        .catch(error => console.log(error))
        
    }
}
