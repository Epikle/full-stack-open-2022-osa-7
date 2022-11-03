import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (!name) return;
      const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
      try {
        const response = await axios.get(url);
        setCountry(response.data[0]);
      } catch (error) {
        setCountry(null);
      }
    };

    fetch();
  }, [name]);

  return country;
};

export default useCountry;
