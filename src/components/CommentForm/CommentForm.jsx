import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Form,
  FormGroup,
} from '@afconsult/apollo';
import * as styles from './CommentForm.css';

require('quill-mention');

const authorPropType = PropTypes.shape({
  displayName: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string,
});

const mentionPropType = PropTypes.shape({
  allowedChars: PropTypes.regexp,
  denotationChars: PropTypes.arrayOf(PropTypes.string),
  onRenderItem: PropTypes.func,
  onSource: PropTypes.func,
});

const propTypes = {
  placeholder: PropTypes.string,
};

const defaultProps = {
  placeholder: 'Write a comment...',
};

const contextTypes = {
  author: authorPropType,
  mention: mentionPropType,
  onSubmit: PropTypes.func,
};

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { disabled: true, editor: null };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyDown(e) {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    const { editor } = this.state;
    const { onSubmit } = this.context;

    if (!onSubmit) {
      e.preventDefault();
      return;
    }

    if (editor) {
      onSubmit(editor);
      this.setState({ disabled: true, editor: undefined });
    }
  }

  handleChange(content, delta, source, editor) {
    const { getText } = editor;
    this.setState({ disabled: !getText(), editor }); // eslint-disable-line
  }

  render() {
    const { disabled } = this.state;
    const { author, mention } = this.context;
    const { placeholder } = this.props;

    const modules = {
      mention: {
        allowedChars: mention.allowedChars,
        mentionDenotationChars: mention.denotationChars,
        renderItem: mention.onRenderItem,
        source: mention.onSource
      },
      toolbar: null,
    };

    return (
      <Form className={styles['comment-form']}>
        <FormGroup className={styles['comment-form-group']}>
          <Avatar
            name={author.displayName}
            size="medium"
            src={author.imageUrl}
          />
        </FormGroup>
        <FormGroup className={styles['comment-form-group']}>
          <ReactQuill
            className={styles.textarea}
            modules={modules}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={placeholder}
          />
        </FormGroup>
        <FormGroup className={styles['comment-form-group']}>
          <Button
            className={styles['button-submit']}
            color="primary"
            disabled={disabled}
            onClick={this.handleSubmit}
          >{'Post'}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

CommentForm.propTypes = propTypes;
CommentForm.defaultProps = defaultProps;
CommentForm.contextTypes = contextTypes;

export default CommentForm;
