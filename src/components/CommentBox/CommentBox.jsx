import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './CommentBox.css';

const propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    imageUrl: PropTypes.string,
    url: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tag: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  author: {
    displayName: undefined,
    imageUrl: undefined,
    url: undefined,
  },
  children: undefined,
  tag: 'div',
  title: 'Comments',
};

const childContextTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    imageUrl: PropTypes.string,
    url: PropTypes.string
  }),
};

class CommentBox extends React.PureComponent {
  getChildContext() {
    const {
      author
    } = this.props;

    return { author };
  }

  render() {
    const {
      children,
      title,
      tag: Tag,
    } = this.props;

    return (
      <Tag className={styles['comment-box']}>
        <h3 className={styles['comment-box-title']}>
          {title}
        </h3>
        {children}
      </Tag>
    );
  }
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;
CommentBox.childContextTypes = childContextTypes;

export default CommentBox;
