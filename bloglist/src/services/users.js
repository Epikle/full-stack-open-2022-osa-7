import axios from 'axios';

const baseUrl = '/api/users';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
