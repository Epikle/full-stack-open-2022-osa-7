import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducers/blogSlice';
import { createComment } from '../services/blogs';

import styles from './CommentForm.module.css';

const CommentForm = ({ id }) => {
  const commentRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;

    await createComment(id, { comment });
    dispatch(addComment({ id, comment }));
    commentRef.current.value = '';
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <input
          ref={commentRef}
          type="text"
          id="add-comment"
          placeholder="add a new comment"
        />
        <button>add comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
