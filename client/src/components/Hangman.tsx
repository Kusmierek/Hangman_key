import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../store';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  assignWord,
  addDisabled,
  wordType,
  finishGame,
  resetAll,
} from '../slices/wordSlice';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { randomWordGet } from '../server/RandomWord';
import { loginType } from '../slices/logginSlice';
import { useScore } from '../server/PostScore';
import Swal from 'sweetalert2';

interface StateProps {
  word: string;
  alphabet: string[];
  disabled: string[];
  finished: boolean;
}

const Hangman = () => {
  const gameState = useSelector<StateType, StateProps>(
    (state) => state.hangmanGameWord
  );
  const loginState = useSelector<StateType, loginType>(
    (state) => state.persistedReducer.login
  );
  const dispatch = useDispatch();
  const { catid } = useParams();
  const { scorePost } = useScore();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(resetAll());
    randomWordGet(catid).then((response: any) => {
      dispatch(assignWord(response.Word[0].name.toUpperCase()));
    });
  }, [dispatch]);

  const errors = useMemo(() => {
    return gameState.disabled.filter(
      (x) => !gameState.word.slice('').includes(x)
    ).length;
  }, [gameState.word, gameState.disabled]);

  const score = useMemo(() => {
    if (errors > 6) {
      dispatch(finishGame);
      return 0;
    } else {
      return 7 + gameState.word.length - errors;
    }
  }, [gameState.word, gameState.disabled]);
  console.log(score);

  const maskedWord = useMemo(() => {
    const state = gameState.word
      .split('')
      .map((letter) =>
        gameState.disabled.includes(letter) || letter == ' ' ? letter : '_'
      )
      .join(' ');
    if (
      (!state.includes('_') && state != '' && gameState.finished !== true) ||
      (gameState.finished !== true && score == 0)
    ) {
      dispatch(finishGame);
      Swal.fire({
        title: `Your score is ${score}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Play Again?',
        cancelButtonText: 'Choose category',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          if (loginState.isLogged) {
            console.log(loginState.user);
            scorePost(
              catid,
              score,
              loginState.user.user._id,
              loginState.user.token
            );
          }
        } else {
          navigate(`/categories`);
          if (loginState.isLogged) {
            scorePost(
              catid,
              score,
              loginState.user.user_id,
              loginState.user.token
            );
          }
          dispatch(resetAll());
        }
      });
    }
    return state;
  }, [gameState.word, gameState.disabled]);

  return (
    <div className="h-1/2">
      {/* {console.log(loginState.user)} */}
      <div className="flex h-3/4 items-center justify-center">
        <svg height="320" width="250" className="figure-container">
          {/* <!-- Rod --> */}
          {errors > 0 && <line x1="60" y1="20" x2="200" y2="20" />}
          {errors > 0 && <line x1="170" y1="20" x2="170" y2="70" />}
          {errors > 0 && <line x1="60" y1="20" x2="60" y2="300" />}
          {errors > 0 && <line x1="20" y1="300" x2="100" y2="300" />}
          {/* <!-- Head --> */}
          {errors > 1 && <circle cx="170" cy="90" r="20" />}
          {/* <!-- Body --> */}
          {errors > 2 && <line x1="170" y1="110" x2="170" y2="180" />}
          {/* <!-- Arms --> */}
          {errors > 3 && <line x1="170" y1="140" x2="120" y2="100" />}
          {errors > 4 && <line x1="170" y1="140" x2="220" y2="100" />}
          {/* <!-- Legs --> */}
          {errors > 5 && <line x1="170" y1="180" x2="190" y2="230" />}
          {errors > 6 && <line x1="170" y1="180" x2="150" y2="230" />}
        </svg>
      </div>
      <div className="flex h-1/4 items-center justify-center">
        <p className="text-6xl text-blue-300 w-auto">{maskedWord}</p>
      </div>
    </div>
  );
};

export default Hangman;
