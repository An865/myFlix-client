import React from 'react';
import {
   Button
 } from "react-bootstrap";

export function GenreView(props){
   const {genre, onBackClick} = props;
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