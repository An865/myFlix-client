import React from 'react';
import {Button} from "react-bootstrap";

export function DirectorView(props){
   const { director, onBackClick } = props;
   const birth = new Date(director.Birth);
   const death = new Date(director.Death);


   return (

     <div>
        <h1>{director.Name}</h1>
         <div className="director-description">
          <p>{birth.getFullYear()} -  {death.getFullYear()}</p>
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