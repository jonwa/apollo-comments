import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Comment from '../Comment';
import * as styles from './CommentBox.css';

const authorPropType = PropTypes.shape({
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string
});

const commentPropType = PropTypes.shape({
  author: authorPropType,
  createdDate: PropTypes.string,
  editable: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.string,
});

const propTypes = {
  activeUser: authorPropType,
  comments: PropTypes.arrayOf(commentPropType),
  onAddComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onTranslateComment: PropTypes.func,
  placeholder: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  activeUser: undefined,
  comments: [],
  onAddComment: undefined,
  onDeleteComment: undefined,
  onTranslateComment: undefined,
  placeholder: 'Write a comment...',
  title: 'Comments',
};

const childContextTypes = {
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onTranslate: PropTypes.func,
};

class CommentBox extends React.PureComponent {
  getChildContext() {
    const {
      onAddComment,
      onDeleteComment,
      onTranslateComment
    } = this.props;

    return {
      onAdd: onAddComment,
      onDelete: onDeleteComment,
      onTranslate: onTranslateComment,
    };
  }

  render() {
    const {
      activeUser,
      comments,
      placeholder,
      title,
    } = this.props;

    const sortedComments = comments.sort((lhs, rhs) => (
      (lhs.createdDate < rhs.createdDate ? -1 : 1)));

    return (
      <div className={styles['comment-box']}>
        <h3>{title}</h3>
        <CommentList>
          {(sortedComments.map(comment => (
            <Comment
              key={shortid.generate()}
              {...comment}
            />
          )))}
        </CommentList>
        <CommentForm activeUser={activeUser} placeholder={placeholder} />
      </div>
    );
  }
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;
CommentBox.childContextTypes = childContextTypes;

export default CommentBox;
