//Packages
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
//Bootstrap components
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//myFlix components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
//Styling
import './main-view.scss';
//Images
import logo from 'url:../../assets/images/MyFlix.png';

class MainView extends React.Component {
    //constructor is responsible for initializing this.state and creating component
    constructor() {
        super();
        //initialize state with movies array
        this.state = {
            movies: [],
            selectedMovie: null,
            userData: null,
            user: null,
            registration: false,
        };
    }

    //store user and token in local storage and get movies with access token
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
            });
            this.getMovies(accessToken);
        }
    }

    //get movie data
    getMovies(token) {
        axios
            .get('https://spiremyflix.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /*When a movie is clicked, this function is invoked and updates the 
  state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie,
        });
    }

    /* When a user successfully logs in, this function updates the `user` 
  property in state to that *particular user*/
    onLoggedIn(authData) {
        this.setState({
            userData: authData.user,
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    /* Log out user when the press logout button */
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            userData: null,
            user: null,
        });
    }

    //render returns visual representation of component
    render() {
        const { movies, selectedMovie, userData, user, registration } =
            this.state;

        return (
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        {' '}
                        <img
                            src={logo}
                            width="110"
                            height="110"
                            className="d-inline-block align-top"
                            alt="myflix logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <LinkContainer
                            className="ml-auto"
                            to={`/users/${user}`}
                        >
                            <Nav.Link>My Account</Nav.Link>
                        </LinkContainer>
                        <Button
                            href="/"
                            className="ml-auto"
                            onClick={() => {
                                this.onLoggedOut();
                            }}
                        >
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Navbar>

                <Row className="main-view justify-content-md-center">
                    <Route
                        exact
                        path="/"
                        render={() => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView
                                            onLoggedIn={(user) =>
                                                this.onLoggedIn(user)
                                            }
                                        />
                                    </Col>
                                );
                            return movies.map((m) => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} key={m._id} />
                                </Col>
                            ));
                        }}
                    />

                    <Route
                        path="/register"
                        render={() => {
                            return (
                                <Col>
                                    <RegistrationView />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/movies/:movieId"
                        render={({ match, history }) => {
                            return (
                                <Col md={8}>
                                    <MovieView
                                        user={user}
                                        movie={movies.find(
                                            (m) =>
                                                m._id === match.params.movieId
                                        )}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/genres/:name"
                        render={({ match, history }) => {
                            if (movies.length === 0)
                                return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        genre={
                                            movies.find(
                                                (m) =>
                                                    m.Genre.Name ===
                                                    match.params.name
                                            ).Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/directors/:name"
                        render={({ match, history }) => {
                            if (movies.length === 0)
                                return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        director={
                                            movies.find(
                                                (m) =>
                                                    m.Director.Name ===
                                                    match.params.name
                                            ).Director
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path={`/users/${user}`}
                        render={({ match, history }) => {
                            return (
                                <Col md={8}>
                                    <ProfileView
                                        movies={movies}
                                        userData={userData}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                </Row>
            </Router>
        );
    }
}

export default MainView;
