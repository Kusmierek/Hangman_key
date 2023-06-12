import axios from 'axios';

const API_URL = 'http://localhost:3000/api/word/random/';

export const randomWordGet = (catid: string | undefined) => {
  return axios
    .get(API_URL + catid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
