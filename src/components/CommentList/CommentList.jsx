import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './CommentList.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tag: PropTypes.string,
};

const defaultProps = {
  children: [],
  tag: 'div',
};

class CommentList extends React.PureComponent {
  render() {
    const {
      children,
      tag: Tag,
    } = this.props;

    return (
      <Tag className={styles['comment-list']}>
        {children}
      </Tag>
    );
  }
}

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

export default CommentList;
