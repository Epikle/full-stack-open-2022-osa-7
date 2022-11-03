import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBlog } from '../services/blogs';
import { setMessage } from '../reducers/notificationSlice';
import { addBlog } from '../reducers/blogSlice';

import styles from './BlogForm.module.css';

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const createdBlog = await createBlog(newBlog);
      const blogWithUser = {
        ...createdBlog,
        user: {
          id: createdBlog.user,
          name: user.name,
          username: user.username,
        },
      };
      dispatch(addBlog(blogWithUser));
      dispatch(
        setMessage({
          message: `a new blog ${title} by ${author} added`,
        }),
      );
      setTitle('');
      setAuthor('');
      setUrl('');
      setVisible((prevState) => !prevState);
    } catch (error) {
      setMessage({
        message: 'something went wrong :(',
        isError: true,
      });
    }
  };

  const toggleVisibility = () => setVisible((prevState) => !prevState);

  if (!visible) {
    return (
      <div className={styles['new-blog']}>
        <button onClick={toggleVisibility}>create new blog</button>
      </div>
    );
  }

  return (
    <div className={[styles['new-blog'], styles.open].join(' ')}>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <button>create</button>

          <button
            type="button"
            className={styles.cancel}
            onClick={toggleVisibility}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
