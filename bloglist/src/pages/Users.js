import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { initUsers } from '../reducers/usersSlice';

import { getAllUsers } from '../services/users';

import styles from './Users.module.css';

const Users = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getAllUsers();
        dispatch(initUsers(response));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  if (id) {
    const user = users.find((user) => user.id === id);
    if (!user) return <p>user not found</p>;
    return (
      <Fragment>
        <h3 className={styles['header-user']}>
          {user.name} <span>added blogs</span>
        </h3>
        <ul className={styles.user}>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h3 className={styles.header}>Users</h3>
      <table className={styles.users}>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Users;
