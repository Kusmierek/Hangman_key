import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const API_URL = 'http://localhost:3000/api/game/new';

export const useScore = () => {
  const dispatch = useDispatch();

  const scorePost = useCallback(
    async (
      category_id: string | undefined,
      score: number,
      user_id: string,
      jwt: string
    ) => {
      try {
        console.log(category_id, score, user_id);
        const response = await axios.post(
          API_URL,
          {
            category_id,
            score,
            user_id,
          },
          {
            headers: { 'x-auth-token': jwt },
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    [dispatch]
  );
  return { scorePost };
};
