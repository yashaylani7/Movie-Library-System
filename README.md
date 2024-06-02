# Movie Library System
Movie Library System is a personal practice-level project, built using React for the frontend and the TMDB API for the backend.


## Project Overview
The project is a simple movie database web application that allows users to browse and search for their favorite movies. It fetches data from the TMDB API and displays it in a user-friendly interface.
It is a practice project to practice react, so I have used TMDB Api as a backend that provides so many end-points that you can integrate in your react app.
It shows you the latest movies of the market, top rated movies of all times, and upcoming movies as well. You can also include the movies to your wishlist that you want to watch later on. You can also arrange your favorite movies list as well.


## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Credits](#credits)


## Technologies Used
- **Frontend:** React (Vite)
- **Backend:** [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)


## Features
- Search for movies using names.
- See different category of movies; Now playing, Upcoming and Top rated movies of all time.
- View detailed information about a movie; description, run-time, imdb link, genres, images, videos and casts.
- Include movies to your wishlist and favorite movies lists (automatically maintained separately for each browser).


## Setup and Installation
1. Clone the repository using command: `git clone https://github.com/yashaylani7/Movie-Library-System.git`.
2. Install the dependencies using `npm install`. (You need to have node.js installed on your system. You can install it from [here](https://nodejs.org/en/download/). I have used v20.11.1 version of node js).
3. Create a TMDB API key by following the instructions [here](https://www.themoviedb.org/documentation/api). You will need to create an account on TMDB to get the API key.
4. There is a file named `tmdb_acc.jsx` in the `src` directory, add the following code to it:
```jsx
export const API_KEY = 'YOUR_API_KEY'
export const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'
```
(Replace `YOUR_API_KEY` and `YOUR_ACCESS_TOKEN` with your actual API key and access token.)  
5. Start the development server using `npm run dev`


## Usage
Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.


## Credits
- The backend of this project is powered by [TMDB API](https://www.themoviedb.org/documentation/api).
