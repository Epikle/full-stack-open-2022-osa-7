import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../reducers/userSlice';

import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <span>BLOGLIST</span>
          {user.isLoggedIn && (
            <nav>
              <ul>
                <li>
                  <Link to="/">blogs</Link>
                </li>
                <li>
                  <Link to="/users">users</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {user.isLoggedIn && (
          <div>
            <strong>{user.name}</strong>
            <button onClick={() => dispatch(logout())}>logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
