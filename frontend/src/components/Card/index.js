import React from 'react';


export const Card = ({title, children}) => {

  return (
    <div className="card md-3">
      <h3 className="card-header"> {title} </h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  )

}
export default Card;