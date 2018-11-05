import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Comment from '../Comment';
import * as styles from './CommentBox.css';

const userPropType = PropTypes.shape({
  displayName: PropTypes.string,
  imageUrl: PropTypes.string,
  redirectUrl: PropTypes.string
});

const commentPropType = PropTypes.shape({
  author: userPropType,
  createdDate: PropTypes.string,
  editable: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.string,
});

const propTypes = {
  activeUser: userPropType,
  comments: PropTypes.arrayOf(commentPropType),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onTranslate: PropTypes.func,
  title: PropTypes.string,
};

const defaultProps = {
  activeUser: null,
  comments: null,
  onAdd: undefined,
  onDelete: undefined,
  onTranslate: undefined,
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
      onAdd,
      onDelete,
      onTranslate
    } = this.props;

    return {
      onAdd,
      onDelete,
      onTranslate,
    };
  }

  render() {
    const {
      activeUser,
      comments,
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
        <CommentForm activeUser={activeUser} />
      </div>
    );
  }
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;
CommentBox.childContextTypes = childContextTypes;

export default CommentBox;
