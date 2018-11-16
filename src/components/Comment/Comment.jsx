import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
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

const authorPropType = PropTypes.shape({
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
});

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  author: authorPropType,
  createdDate: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  actions: [],
  author: {
    displayName: null,
    id: null,
    imageUrl: null,
    url: null,
  },
  createdDate: null,
  id: null,
  text: null,
};

const contextTypes = {
  dateFormat: PropTypes.string,
  onTranslate: PropTypes.func,
};

class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleTranslate = this.handleTranslate.bind(this);
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
      actions,
      author,
      createdDate,
      id,
      text,
    } = this.props;

    const {
      dateFormat,
      onTranslate,
    } = this.context;

    return (
      <div className={styles.comment}>
        <div>
          <Avatar
            className={styles['comment-author-avatar']}
            name={author.displayName}
            onClick={() => author.onClick(author.id)}
            size="small"
            src={author.imageUrl}
          />
        </div>
        {(actions.length > 0) ? (
          <BasicDropdown className={styles['comment-actions-dropdown']}>
            <DropdownToggle className={styles['comment-actions-dropdown-toggle']}> {/* eslint-disable-line react/jsx-no-literals */}
              ...
            </DropdownToggle>
            <DropdownMenu right>
              {actions.map(action => (
                <DropdownItem
                  key={shortid.generate()}
                  onClick={() => action.onClick(id)}
                >{action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </BasicDropdown>
        ) : null}
        <div className={styles['comment-body']}>
          <button className={styles['comment-body-author-name']} onClick={() => author.onClick(author.id)}>
            {author.displayName}
          </button>
          <p className={styles['comment-body-text']} dangerouslySetInnerHTML={{ __html: text }} />
          <small className={styles['comment-body-date']}>{moment(createdDate).format(dateFormat)}</small>
          {onTranslate && (
            <Button
              className={styles['comment-button-translate']}
              color="link"
              onClick={this.handleTranslate}
              size="small"
            >{'Translate'}
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
