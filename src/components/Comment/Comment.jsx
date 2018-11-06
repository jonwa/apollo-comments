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

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  author: PropTypes.shape({
    displayName: PropTypes.string,
    imageUrl: PropTypes.string,
    url: PropTypes.string
  }),
  createdDate: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  translate: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })
};

const defaultProps = {
  actions: undefined,
  author: {
    displayName: undefined,
    imageUrl: undefined,
    url: undefined,
  },
  createdDate: undefined,
  id: undefined,
  text: undefined,
  translate: undefined,
};

class Comment extends React.PureComponent {
  render() {
    const {
      actions,
      author,
      createdDate,
      id,
      text,
      translate,
    } = this.props;

    return (
      <div className={styles.comment}>
        <Avatar
          className={styles['comment-author-avatar']}
          name={author.displayName}
          size="small"
          src={author.imageUrl}
        />
        <div className={styles['comment-body']}>
          {actions && (
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
          )}
          <p className={styles['comment-author-name']}>{author.displayName}</p>
          <p className={styles['comment-text']} dangerouslySetInnerHTML={{ __html: text }} />
          <small>{moment(createdDate).format('YYYY-MM-DD HH:mm:ss')}</small>
          {translate && (
            <Button
              className={styles['button-translate']}
              color="link"
              onClick={() => translate.onClick(id)}
              size="small"
            >{translate.label}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;

