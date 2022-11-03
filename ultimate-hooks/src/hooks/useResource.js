import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };

    fetch();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources((prevS) => prevS.concat(response.data));
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
