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
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
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
  placeholder: null,
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
    const { getLength } = editor;
    // TODO(jon): Does not work due to quill mention!
    this.setState({ disabled: getLength() === 1, editor: editor }); // eslint-disable-line
  }

  render() {
    const { disabled } = this.state;
    const { author, mention } = this.context;
    const { placeholder } = this.props;
    let mentionOptions = null;

    // TODO(jon): only add mention if mention is not null;
    if (mention) {
      mentionOptions = {
        allowedChars: mention.allowedChars,
        mentionDenotationChars: mention.denotationChars,
        renderItem: mention.onRenderItem,
        source: mention.onSource
      };
    }

    const modules = {
      mention: mentionOptions,
      toolbar: null,
    };

    return (
      <Form className={styles['comment-form']}>
        <FormGroup className={styles['comment-form-group']}>
          <Avatar
            name={author.displayName}
            onClick={() => author.onClick(author.id)}
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
