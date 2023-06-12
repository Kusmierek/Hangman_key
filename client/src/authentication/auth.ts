import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loggedIn, loginType } from '../slices/logginSlice';
import { StateType } from '../store';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000/api/authentication/';

export interface SignUpType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerPost = useCallback(
    async ({ username, email, password }: SignUpType) => {
      try {
        const response = await axios.post(API_URL + 'register', {
          username,
          email,
          password,
        });
        Swal.fire('Registred Correctly!').then(() => {
          navigate(`/categories`);
        });
        return response.data;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error}`,
        });
      }
    },
    []
  );
  return { registerPost };
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginPost = useCallback(
    async ({ email, password }: SignUpType) => {
      try {
        const response = await axios.post(API_URL + 'login', {
          email,
          password,
        });
        dispatch(loggedIn(response.data.User));
        Swal.fire('Logged Correctly!').then(() => {
          navigate(`/categories`);
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error}`,
        });
      }
    },
    [dispatch]
  );

  // return axios
  //   .post(API_URL + 'login', {
  //     email,
  //     password,
  //   })
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });
  return { loginPost };
};
