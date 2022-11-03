import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Blogs from './pages/Blogs';
import BlogPage from './pages/Blog';
import Users from './pages/Users';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { getAll, setToken } from './services/blogs';
import { setMessage } from './reducers/notificationSlice';
import { initBlogs } from './reducers/blogSlice';
import { setUser } from './reducers/userSlice';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = localStorage.getItem('FSO_osa4_user');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setToken(user.token);
      dispatch(setUser(user));
    }

    const fetchBlogs = async () => {
      try {
        const blogs = await getAll();
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        dispatch(initBlogs(sortedBlogs));
      } catch (error) {
        dispatch(setMessage({ message: error.message, isError: true }));
      }
    };
    fetchBlogs();
  }, []);

  if (!user.isLoggedIn) {
    return (
      <Fragment>
        <Header />
        <Notification />
        <main>
          <LoginForm />
        </main>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <Notification />
      <main>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="*" element={<Blogs />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
