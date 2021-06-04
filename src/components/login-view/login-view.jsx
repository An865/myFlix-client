/* Packages and Bootstrap Components */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//Styling
import './login-view.scss';

/* Functional Component for Login View  */
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios
            .post('https://spiremyflix.herokuapp.com/login', {
                Username: username,
                Password: password,
            })
            .then((response) => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch((e) => {
                console.log('no such user');
            });
    };

    return (
        <Form className="login-form">
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button
                id="submit-button"
                variant="primary"
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </Button>

            <span id="membership">Not yet a member? </span>
            <Link to={`/register`}>Register Now</Link>
        </Form>
    );
}

// establish prop types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
