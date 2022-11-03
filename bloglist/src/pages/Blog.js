import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import CommentForm from '../components/CommentForm';
import { addLike } from '../reducers/blogSlice';
import { likeBlog } from '../services/blogs';

import styles from './Blog.module.css';

const Blog = () => {
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.blog.find((blog) => blog.id === id),
  );

  const likeBtnHandler = async () => {
    setDisabled(true);
    try {
      const newBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      };
      await likeBlog(newBlog);
      dispatch(addLike(blog.id));
      setDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!id || !blog) return null;
  return (
    <Fragment>
      <div className={styles.header}>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className={styles.likes}>
        {blog.likes} likes{' '}
        <button onClick={likeBtnHandler} disabled={disabled}>
          like
        </button>
      </div>
      <div>
        <strong>author</strong> {blog.author}
      </div>
      <div className={styles.added}>
        <strong>added by</strong>{' '}
        <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </div>
      <div className={styles.comments}>
        <h4>Comments</h4>
        <CommentForm id={blog.id} />
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Blog;
