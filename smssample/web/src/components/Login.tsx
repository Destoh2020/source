import axios, { AxiosError } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ApiResponse } from '../common/common';
import '../css/login.css';
import { baseApiUrl, setUserId } from '../store/slices/appSlice';

function Login(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const baseUrl = useSelector(baseApiUrl);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (username === '') {
      Swal.fire({
        icon: 'error',
        text: 'Please enter username',
      });
      return;
    }

    if (password === '') {
      Swal.fire({
        icon: 'error',
        text: 'Please enter password',
      });
      return;
    }

    Swal.fire({
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const url = `${baseUrl}/login?username=${username}&password=${password}`;
        axios
          .get(url)
          .then((response) => {
            const data: ApiResponse = response.data;
            if (!data.status) {
              Swal.fire({
                icon: 'error',
                title: 'Login failed!',
                text: data.message,
              });
              return;
            }
            const userId = data.user ? data.user.id : '';
            dispatch(setUserId(userId));
            Swal.close();
            props.history.push('/');
          })
          .catch((ex: AxiosError) => {
            Swal.fire({
              icon: 'error',
              title: 'Login failed!',
              text: ex.message,
            });
          });
      },
    });
  };

  return (
    <main className='form-signin'>
      <form>
        <div className='text-center'>
          <img
            className='mb-4 m'
            src='https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg'
            alt=''
            width='72'
            height='57'
          />
        </div>
        <h1 className='h3 mb-3 fw-normal text-center'>Please sign in</h1>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='username'
            placeholder='username'
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor='username'>Username</label>
        </div>
        <div className='form-floating mt-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor='password'>Password</label>
        </div>

        <button
          className='w-100 mt-2 btn btn-lg btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          Sign in
        </button>
        <p className='mt-5 mb-3 text-muted'>&copy; 2021</p>
      </form>
    </main>
  );
}

export default Login;
