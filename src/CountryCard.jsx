import React from 'react';


const CountryCard = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} />
      <p>{name}</p>
    </div>
  );
};

export default CountryCard;
