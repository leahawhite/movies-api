const moviesRouter = require('express').Router()
const Movie = require('../models/movie-model')

moviesRouter
  .route('/')
  .get((req, res, next) => {
    const { title='' } = req.query
    Movie.find({ title: new RegExp(title, 'i')})
    .then(movies => {
      res
        .status(200)
        .json(movies)
    })
    .catch(next) 
  })
  .post((req, res, next) => {
    const { title, release_date, overview } = req.body
    const newMovie = new Movie({
      title,
      release_date,
      overview
    })
    newMovie.save()
    .then(() => {
      res
        .status(201)
        .json(newMovie)
    })
    .catch(next)
  })
  .patch(async(req, res, next) => {
    const { id, title } = req.query
    const updatedMovie = req.body
    try {
      const movie = await Movie.findOneAndUpdate(
        { $or: [{ _id: id }, { title: title }] },
        { $set: updatedMovie },
        { new: true }
      )
      res.status(200).json(movie)
    }
    catch {
      next()
    }
  })
  .delete((req, res, next) => {
    const { id, title } = req.query
    Movie.findOneAndDelete( 
      {$or: [{ _id: id }, { title: title }] }
    )
      .then(() => res.status(204).end())
      .catch(next)
  })


module.exports = moviesRouter