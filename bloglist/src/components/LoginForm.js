import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setMessage } from '../reducers/notificationSlice';
import { setUser } from '../reducers/userSlice';
import { setToken } from '../services/blogs';
import { loginUser } from '../services/login';

import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };

    try {
      const user = await loginUser(credentials);
      setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(
        setMessage({ message: 'wrong username or password', isError: true }),
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>log in to application</h2>
      <form onSubmit={submitHandler} className={styles.login}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
