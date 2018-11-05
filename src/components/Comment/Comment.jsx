import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar,
  BasicDropdown,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from '@afconsult/apollo';
import * as styles from './Comment.css';

const propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    imageUrl: PropTypes.string,
    profileUrl: PropTypes.string
  }),
  createdDate: PropTypes.string,
  editable: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  author: {
    displayName: '',
    imageUrl: '',
    profileUrl: '',
  },
  createdDate: null,
  editable: false,
  id: null,
  text: null,
};

const contextTypes = {
  onDelete: PropTypes.func,
  onTranslate: PropTypes.func,
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTranslate = this.handleTranslate.bind(this);
  }

  handleDelete(e) {
    const { id } = this.props;
    const { onDelete } = this.context;
    if (!onDelete) {
      e.preventDefault();
      return;
    }

    onDelete(id);
  }

  handleTranslate(e) {
    const { id } = this.props;
    const { onTranslate } = this.context;
    if (!onTranslate) {
      e.preventDefault();
      return;
    }

    onTranslate(id);
  }

  render() {
    const {
      text,
      createdDate,
      author: {
        imageUrl,
        displayName,
      },
      editable,
    } = this.props;

    const { onTranslate } = this.context;

    const deleteText = 'Delete';
    const translateText = 'Translate';

    return (
      <div className={styles.comment}>
        <Avatar
          className={styles['comment-author-avatar']}
          name={displayName}
          size="small"
          src={imageUrl}
        />
        <div className={styles['comment-body']}>
          {editable && (
            <BasicDropdown className={styles['comment-settings']}>
              <DropdownToggle>...</DropdownToggle>{/* eslint-disable-line react/jsx-no-literals */}
              <DropdownMenu right>
                <DropdownItem onClick={this.handleDelete}>
                  {deleteText}
                </DropdownItem>
              </DropdownMenu>
            </BasicDropdown>
          )}
          <p className={styles['comment-author-name']}>{displayName}</p>
          <p dangerouslySetInnerHTML={{ __html: text }} />
          <small>{moment(createdDate).format('YYYY-MM-DD HH:mm:ss')}</small>
          {onTranslate && (
            <Button
              className={styles['button-translate']}
              color="link"
              onClick={this.handleTranslate}
              size="small"
            >{translateText}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;
Comment.contextTypes = contextTypes;

export default Comment;

