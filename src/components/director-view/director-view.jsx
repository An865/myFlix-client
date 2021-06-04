/* Packages and Bootstrap Components */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/* Functional Component for Director Data */
export function DirectorView(props) {
    const { director, onBackClick } = props;
    const birth = new Date(director.Birth);
    const death = new Date(director.Death);

    return (
        <div>
            <h1>{director.Name}</h1>
            <div className="director-description">
                <p>
                    {birth.getFullYear()} - {death.getFullYear()}
                </p>
                <p>{director.Bio}</p>
            </div>
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
DirectorView.propTypes = {
    director: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired,
};
