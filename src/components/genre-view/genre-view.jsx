/* Packages and Bootstrap */
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Functional Component for Genre Data */
export function GenreView(props) {
    const { genre, onBackClick } = props;
    return (
        <div>
            <h1>{genre.Name}</h1>
            <div>{genre.Description}</div>
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
    );
}

//establish property types
GenreView.propTypes = {
    genre: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired,
};
