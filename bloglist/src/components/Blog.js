import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
  return <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
