import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../store';
import { loggedIn, loginType } from '../slices/logginSlice';
import { SignUpType, useLogin } from '../authentication/auth';
import ErrorAlert from './ErrorAlert';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must not exceed 40 characters')
    .required(),
});

const Login = () => {
  const loginState = useSelector<StateType, loginType>(
    (state) => state.persistedReducer.login
  );
  const { loginPost } = useLogin();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: SignUpType, errors: any) => {
    loginPost(data);
  };

  return (
    <div className="login relative flex flex-col justify-centerS overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-300 underline">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" {...register('email')} />
            {errors.email && <ErrorAlert errorInfo={errors.email.message} />}
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              {...register('password')}
            />
            {errors.password && (
              <ErrorAlert errorInfo={errors.password.message} />
            )}
          </div>
          <div className="mt-6">
            <button className="form-button">Login</button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Don't have an account?{' '}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
