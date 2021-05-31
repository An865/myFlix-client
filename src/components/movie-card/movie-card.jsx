//Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Bootstrap Components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//Styling
import './movie-card.scss';
import movieImg from 'url:../../assets/images/tokillamockingbird.jpg';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        const fileName = movie.ImagePath;
        const baseUrl = '../../assets/images/';

        return (
            <Card border="secondary" bg="light">
                <Card.Img variant="top" src={movieImg} />

                <Card.Body className="card-body">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

//establish property types
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
};
