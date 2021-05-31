/* Packages and Bootstrap Components */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

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
        <Form>
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Link to={`/register`}>
                <Button variant="link">Register Now</Button>
            </Link>
        </Form>
    );
}

// establish prop types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
