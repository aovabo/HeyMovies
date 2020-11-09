# HeyMovies

A simple and easy to use Website for searching movies, and showing the top 5 most popular ones. HeyMovies also provide a nomination system for users to nominate their liked movie.

## Requirements

- NodeJS v14

## Installation

Clone the repo then simply run `$ npm install` in the terminal with the same directory as the repo to install the dependencies.

## Running

Make sure to configure the server first!

To run this in development mode, kindly do `$ npm run dev` which will open the webserver at port `:80`.

To run this in production mode, kindly build it first by doing `$ npm run build` then do `$ npm run start` to run it in production mode at port `:80`.

## Manager

The `/Manager` folder is for handling expired session keys in the database. It is not required to be ran, but if you'd like, just do `$ npm run manager`
