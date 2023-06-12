import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const API_URL = 'http://localhost:3000/api/word/';

export const useEditWord = () => {
  const editWord = useCallback(
    async (
      _id: string,
      name: string,
      translation: string,
      category_id: string | string[]
    ) => {
      try {
        console.log(category_id);
        const response = await axios.put(`${API_URL}${_id}`, {
          name,
          translation,
          category_id,
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
  return { editWord };
};
