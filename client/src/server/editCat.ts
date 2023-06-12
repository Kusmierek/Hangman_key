import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const API_URL = 'http://localhost:3000/api/cat/';

export const useEditCat = () => {
  const editCat = useCallback(
    async (_id: string, name: string, translation: string) => {
      try {
        const response = await axios.put(`${API_URL}${_id}`, {
          name,
          translation,
        });
        console.log(response);
        console.log('próba');
        return response;
      } catch (error) {
        console.log(error);
        console.log(error);
        return error;
      }
    },
    []
  );
  return { editCat };
};
