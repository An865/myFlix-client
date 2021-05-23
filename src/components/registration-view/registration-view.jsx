//Packages
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
//Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //create new user with axios post request
        let registerUrl = 'https://spiremyflix.herokuapp.com/users';

        axios
            .post(registerUrl, {
                Username: username,
                Password: password,
                Email: email,
                Birth: birthdate,
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                window.alert('successful registration');
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch((e) => {
                console.log('error registering the user');
                console.log(e);
            });
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBirthdte">
                <Form.Label>Birthdate (YYYY-MM-DD)</Form.Label>
                <Form.Control
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}
