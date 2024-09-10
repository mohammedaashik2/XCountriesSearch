import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching the countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredCountries(
        countries.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredCountries(countries);
    }
  }, [search, countries]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
      />
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name.common}
              flag={country.flags.png}
            />
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default App;
