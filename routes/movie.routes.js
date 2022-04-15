var express = require('express')
var router = express.Router();
var movieModel = require('../models/movie')

//Get A Movies List(/api/movies/:movie_id)
router.get('/:movieId', function (req, res, next) {
    // res.json("Response with a resoucer MOVIE LİST")
    movieModel.findById(req.params.movieId)
        .then((movie) => { res.json(movie) })
        //.catch((err) => { res.json(err) })
        .catch((err) => { next({ message: 'The Movie Was Not Found.', status: 99 }) })
})

//Get Movies List
router.get('/', function (req, res, next) {
    // res.json("Response with a resoucer MOVIE LİST")
    movieModel.find()
        .then((movieList) => { res.json(movieList) })
        .catch((err) => { res.json(err) })
})

//Post Add Movie
/*
//Post 
router.post('/',function (req,res) {
    //Mapping model with schema(table)
    const newMovie=new movieModel({
        title:req.body.title,
        imdb_score:req.body.imdb_score,
        category:req.body.country,
        year:req.body.year
    })
    newMovie.save((err,data)=>{
        if (err) {res.json(err)}
        res.json(data)
    })
})
*/

//Post(Alternative) 
router.post('/', function (req, res) {
    //Mapping model with schema(table)
    const newMovie = new movieModel(req.body)

    newMovie.save()
        .then((movie) => { res.json(movie) })
        .catch((err) => { res.json(err) })
})

//PUT Update Movie
router.put('/:movieId', function (req, res, next) {
    // res.json("Response with a resoucer MOVIE LİST")
    movieModel.findByIdAndUpdate(req.params.movieId,req.body,{new:True})
        .then((movie) => { res.json(movie) })
        //.catch((err) => { res.json(err) })
        .catch((err) => { next({ message: 'The Movie Was Not Found.', status: 99 }) })
})

//DELETE A Movie(/api/movies/:movie_id)
router.delete('/:movieId', function (req, res, next) {
    // res.json("Response with a resoucer MOVIE LİST")
    movieModel.findByIdAndRemove(req.params.movieId)
        .then((movie) => { res.json(movie) })
        .catch((err) => { next({ message: 'The Movie Was Not Found.', status: 99 }) })
})



module.exports = router