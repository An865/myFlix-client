//Packages
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Button, Form } from 'react-bootstrap';

export function ProfileView(props) {
    //passed data
    const { movies, userData } = props;

    //favorite movies
    let arrayOfFavorites = userData.FavoriteMovies;
    let favorites = movies.filter((movie) =>
        arrayOfFavorites.includes(movie._id)
    );

    //state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [favoriteMovies, setfavoriteMovies] = useState([]);

    //update user info with axios put request
    const updateInfo = (e) => {
        e.preventDefault();

        //token and form data JSON object to be passed in put request
        const token = localStorage.getItem('token');
        const updateUrl = `https://spiremyflix.herokuapp.com/users/${userData.Username}`;

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
                const data = response.data;
                console.log(response);
                //update local storage
                localStorage.setItem('user', username);
                alert('profile was updated successful');
            })
            .catch((e) => {
                console.log('error updating user information');
            });
    };

    return (
        <div>
            <h1>Welcome {userData.Username}!</h1>
            <Form>
                <h5>Update Your Information:</h5>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
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

            <h5>Favorite Movies:</h5>
            <ul>
                {favorites.map((favmov) => {
                    <li>
                        <Link to={`/movies/${favmov._id}`}>{favmov.Title}</Link>
                        {console.log(favmov.Title)}
                    </li>;
                })}
            </ul>
            <Button>Back</Button>
        </div>
    ); //end return
} //end export functional component
