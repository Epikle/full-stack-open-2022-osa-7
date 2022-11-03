import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';

import styles from './Blogs.module.css';

const Blogs = () => {
  const blogs = useSelector((state) => state.blog);

  return (
    <Fragment>
      <BlogForm />
      <h3 className={styles.header}>Blogs</h3>
      <ul className={styles.blogs}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog blog={blog} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Blogs;
