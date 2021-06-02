//Packages and Bootstrap Components
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
//Styling
import './movie-view.scss';
import likeimg from 'url:../../assets/icons/like.png';
import axios from 'axios';
const dispatch = useDispatch();

export function MovieView(props) {
    const { user, movie, onBackClick } = props;
    const addMovie = (e, user, movieId) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const addUrl = `https://spiremyflix.herokuapp.com/users/${user.Username}/movies/${movieId}`;
        axios
            .put(
                addUrl,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: SET_FAVORITES,
                    value: response.data.FavoriteMovies,
                });
                alert('movie was updated successful');
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <div className="movie-view">
                <div className="movie-poster">
                    {/* <img src={`/${movie.ImagePath}`} /> */}
                    <img src="path" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
                <img
                    src={likeimg}
                    onClick={(e) => {
                        addMovie(e, user, movie._id);
                    }}
                />
                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        onBackClick(null);
                    }}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

//establish property types
MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
