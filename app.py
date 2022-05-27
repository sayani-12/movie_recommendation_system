import flask
import numpy as np
import pandas as pd
import csv

from flask import jsonify, url_for

import json
from flask import request
from flask import Flask, render_template, redirect, url_for
import model

app = Flask(__name__)
all_movie_ids = [4, 5, 6]
movie_id = [0]

df1 = pd.read_csv('tmdb_5000_credits.csv')
d2 = df1.query('title == title')['movie_id']
d2 = d2.to_dict()

titles = df1['title'].tolist()


@app.route('/')
def login():
    return render_template('login.html')

@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/recommendations')
def my_recommendations():
    return render_template('recommendations.html')

@app.route('/get_ids', methods=['POST'])
def get_ids():
    return flask.jsonify({'ids': all_movie_ids})


@app.route('/ProcessUserInfo/<string:movie_name>', methods=['POST'])
def ProcessUserInfo(movie_name):
    movie_name = json.loads(movie_name)
    title = movie_name
    print()
    print("USER INFO RECEIVED")
    print("title is", title)
    res = model.get_recommendations(title)
    res = res.to_dict()
    movie_ids = [d2[ids] for ids in res.keys()]
    all_movie_ids.extend(movie_ids)
    print(all_movie_ids)
    print()
    return('/')

@app.route('/movie_info')
def movie_info():
    return render_template('movie_info.html')

@app.route('/ProcessUserId/<string:id>', methods=['POST'])
def ProcessUserId(id):
    id = json.loads(id)
    movie_id.append(id)
    return('/')

@app.route('/get_movie_id', methods=['POST'])
def get_movie_id():
    return flask.jsonify({'id': movie_id})

if __name__ == "__main__":
    app.run(debug=True)
