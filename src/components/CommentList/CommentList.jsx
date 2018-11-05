import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './CommentList.css';

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
  children: PropTypes.arrayOf(commentPropType),
};

const defaultProps = {
  children: [],
};

class CommentList extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles['comment-list']}>
        {children}
      </div>
    );
  }
}

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

export default CommentList;
