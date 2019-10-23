const moviesRouter = require('express').Router()
const Movie = require('../models/movie-model')

moviesRouter
  .route('/')
  .get((req, res, next) => {
    const { title='', sort } = req.query
    const pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10
    }
    // TODO: refine sort if/else, add more options
    if (sort) {
      if (!['id', 'title'].includes(sort)) {
        return res
          .status(400)
          .send(`Sort value must be either 'id' or 'title'`)
      }
      Movie.find({ title: new RegExp(title, 'i')})
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ [sort]: 'asc' })
        .then(movies => {
          res
            .status(200)
            .json(movies)
        })
        .catch(next) 
    } else {
      Movie.find({ title: new RegExp(title, 'i')})
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .then(movies => {
          res
            .status(200)
            .json(movies)
        })
        .catch(next) 
      }
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