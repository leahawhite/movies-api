# Movies API

## Server is hosted on Heroku:

[https://sleepy-island-17445.herokuapp.com/](https://sleepy-island-17445.herokuapp.com/)


## API Endpoints

To test the /movies endpoint, enter the https://sleepy-island-17445.herokuapp.com/api/movies URL into Postman, Insomnia, cURL, etc., and test the following methods.

Movies
- GET '/api/movies' gets all movies in the database, with an option to search by title
  - optional query params
    - title: allows a search by movie title
    - sort: sort by either 'title' or 'id' (asc)
    - limit: limit results by integer (default 10)
    - page: show paginated results (start with 0)
  
- POST '/api/movies' creates a new movie entry
  - see Movies Schema below -- all three fields are required
- PATCH '/api/movies' updates a movie entry
  - update any of the 1-3 fields
  - mandatory query params, one of either:
    - title: allows a search by movie title
    - id: searches for entry by id
- DELETE '/api/movies' deletes a movie entry
  - mandatory query params, one of either:
    - title: allows a search by movie title
    - id: searches for entry by id

## Movies Schema

```
{
  "title": String,
  "release_date": Date,
  "overview": String,
}
```
