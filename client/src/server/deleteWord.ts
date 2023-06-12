import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const API_URL = 'http://localhost:3000/api/word/';

export const useDeleteWord = () => {
  const deleteWord = useCallback(async (_id: string) => {
    try {
      console.log(_id);
      const response = await axios.delete(`${API_URL}/${_id}`);
      console.log(response);
      console.log('próba');
      return response;
    } catch (error) {
      console.log(error);
      console.log(error);
      return error;
    }
  }, []);
  return { deleteWord };
};
