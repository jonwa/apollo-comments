import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import * as styles from './CommentBox.css';

const authorPropType = PropTypes.shape({
  displayName: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string,
});

const commentPropType = PropTypes.shape({
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  author: authorPropType,
  createdDate: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
});

const mentionPropType = PropTypes.shape({
  denotations: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  pattern: PropTypes.string,
});

const propTypes = {
  author: authorPropType,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  comments: PropTypes.arrayOf(commentPropType),
  mention: mentionPropType,
  onSubmit: PropTypes.func,
  onTranslate: PropTypes.func,
  placeholder: PropTypes.string,
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
  comments: undefined,
  mention: {
    denotations: ['@'],
    onChange: undefined,
    pattern: /^[A-Za-z\sÅÄÖåäö]*$/,
  },
  onSubmit: undefined,
  onTranslate: undefined,
  placeholder: undefined,
  tag: 'div',
  title: undefined,
};

const childContextTypes = {
  author: authorPropType,
  mention: mentionPropType,
  onSubmit: PropTypes.func,
  onTranslate: PropTypes.func,
};

class CommentBox extends React.PureComponent {
  getChildContext() {
    const {
      author,
      onSubmit,
      onTranslate,
      mention,
    } = this.props;

    return {
      author,
      mention,
      onSubmit,
      onTranslate,
    };
  }

  render() {
    const {
      comments,
      placeholder,
      title,
      tag: Tag,
    } = this.props;

    return (
      <Tag className={styles['comment-box']}>
        <h3 className={styles['comment-box-title']}>
          {title}
        </h3>
        <CommentList>
          {comments.map(comment => (
            <Comment key={shortid.generate()} {...comment} />
          ))}
        </CommentList>
        <CommentForm placeholder={placeholder} />
      </Tag>
    );
  }
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;
CommentBox.childContextTypes = childContextTypes;

export default CommentBox;
