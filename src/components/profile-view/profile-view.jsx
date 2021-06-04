//Packages
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Bootstrap Components
import { Button, Form } from 'react-bootstrap';
//Images and Styling
import deleteimg from 'url:../../assets/icons/delete.png';
import './profile-view.scss';
import { SET_FAVORITES, SET_USER } from '../../actions/actions';

export function ProfileView(props) {
    //passed data
    const { movies, onBackClick } = props;

    //Data from Redux Store
    const userData = useSelector((state) => state.user);
    const favorites = useSelector((state) =>
        state.movies.filter((m) => userData.FavoriteMovies.includes(m._id))
    );
    const dispatch = useDispatch();

    //state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    //validate form
    const formValidation = () => {
        let isValid = true;
        if (username.trim().length < 5) {
            window.alert(
                'username must be alphanumeric and contain at least 5 characters'
            );
            isValid = false;
        }
        if (password.trim().length < 3) {
            window.alert(
                'current and new password (minimum 4 characters) required'
            );
            isValid = false;
        }
        if (!(email && email.includes('.') && email.includes('@'))) {
            window.alert('email address is required.');
            isValid = false;
        }
        if (birthdate === '') {
            window.alert('please enter birthdate YYYY-MM-DD');
            isValid = false;
        }
        return isValid;
    };

    //delete user account
    const deleteAccount = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const deleteUrl = `https://spiremyflix.herokuapp.com/users/${userData.Username}`;
        axios
            .delete(deleteUrl, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.alert('account deleted');
                window.open('/', '_self');
            })
            .catch((error) => console.error(error));
    };

    //delete movie from favorites
    const deleteMovie = (e, movieId) => {
        e.preventDefault();
        const deleteMovUrl = `https://spiremyflix.herokuapp.com/users/${userData.Username}/${movieId}`;
        const token = localStorage.getItem('token');

        axios
            .delete(deleteMovUrl, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                dispatch({
                    type: SET_FAVORITES,
                    value: response.data.FavoriteMovies,
                });
                dispatch({ type: SET_USER, value: response.data });
                window.alert('movie deleted');
            })
            .catch((e) => {
                console.log(`error updating user information: ${e}`);
            });
    };

    //update user info with axios put request
    const updateInfo = (e) => {
        e.preventDefault();

        //token and form data JSON object to be passed in put request
        const token = localStorage.getItem('token');
        const updateUrl = `https://spiremyflix.herokuapp.com/users/${userData.Username}`;
        let isValid = formValidation();
        if (isValid) {
            axios
                .put(
                    updateUrl,
                    {
                        Username: username,
                        Password: password,
                        Email: email,
                        Birth: birthdate,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((response) => {
                    dispatch({ type: SET_USER, value: response.data });
                    localStorage.setItem('user', username);
                    alert('profile was updated successful');
                })
                .catch((e) => {
                    console.log('error updating user information');
                });
        }
    };

    return (
        <div>
            <h1>Welcome {userData.Username}!</h1>
            <Form>
                <h5>Update Your Information:</h5>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        minLength="4"
                        type="text"
                        placeholder={userData.Username}
                        defaultValue={userData.Username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={userData.Email}
                        defaultValue={userData.Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBirthdate">
                    <Form.Label>Birthdate (YYYY-MM-DD)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={userData.Birth}
                        defaultValue={userData.Birth}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </Form.Group>

                <h5>Update Your Password:</h5>
                <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        minLength="4"
                        type="password"
                        placeholder="New Password"
                        defaultValue={userData.Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        defaultValue={userData.Password}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            confirmPassword !== password
                                ? e.target.setCustomValidity(
                                      'passwords must match'
                                  )
                                : e.target.setCustomValidity('');
                        }}
                    />
                </Form.Group>
            </Form>
            <Button onClick={updateInfo}> Update Account </Button>
            <h5>Favorite Movies:</h5>
            <ul>
                {favorites.map((favmov) => {
                    return (
                        <li key={favmov._id}>
                            <span className="left">
                                <Link to={`/movies/${favmov._id}`}>
                                    {favmov.Title}
                                </Link>
                            </span>
                            <span className="right">
                                <img
                                    className="left"
                                    src={deleteimg}
                                    alt="delete movie"
                                    onClick={(e) => {
                                        deleteMovie(e, favmov._id);
                                    }}
                                />
                            </span>
                        </li>
                    );
                })}
            </ul>
            <h5>Delete Your Account</h5>
            <Button variant="danger" onClick={deleteAccount}>
                Delete Account
            </Button>
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
    ); //end return
} //end export functional component

//establish property types
ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,
    onBackClick: PropTypes.func.isRequired,
};
