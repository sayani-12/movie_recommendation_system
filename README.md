# Content-based movie recommendation system using cosine similarity
### This website recommends top 10 similar movies based on a movie watched by the user. It also gives the search functionality to the user and information about all the recommended movies.

---
## Folder structure:
```
-README.md
-static
    -login_page.jpg
    -rec_page.jpg
    -script.js
    -script2.js
    -script3.js
    -style.css
    -style2.css
    -style3.css
-templates
    -index.html
    -login.html
    -movie_info.html
    -recommendations.html
-app.py
-model.py
-requirements.txt
-tmdb_5000_credits.csv
-tmdb_5000_movies.csv
```
---

```
app.py: Flask app where model.py is imported as a module
model.py: The ML model
```
Dataset link: https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata

API used: The Movie Database(TMDB) API

---
# How to run the project?
Clone this project into your local repository and install all the packages mentioned in the requirements.txt. In the terminal, run the command ```python app.py```. Go to the link http://127.0.0.1.5000/ to visit the website.

---

# Tech stack used:
- Frontend: HTML, CSS, JS, Bootstrap
- Backend web framework used: Flask
- AJAX is used to communicate with the server

---
# About the ML model:
- Features of the movie used are cast, crew, genres, plot keywords
- Data cleaning and creation of metadata
- Similarity scores are calculated using the cosine similarity and the movies are sorted based on their scores
