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
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
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
    this.state = {
      disabled: true,
      mentionOpen: false,
      value: undefined,
    };
    this.reactQuillRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMentionOpen = this.handleMentionOpen.bind(this);
    this.handleMentionClose = this.handleMentionClose.bind(this);
  }

  handleChange(value, delta, source, editor) {
    this.setState(() => ({
      disabled: editor.getLength() === 1,
      value
    }));
  }

  handleKeyDown(e) {
    const { mentionOpen } = this.state;
    if (mentionOpen) {
      return;
    }

    if (!e.shiftKey && e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    const { onSubmit } = this.context;

    if (!onSubmit) {
      e.preventDefault();
      return;
    }

    const {
      getEditor,
      makeUnprivilegedEditor,
    } = this.reactQuillRef;

    const editor = makeUnprivilegedEditor(getEditor());
    onSubmit(editor);

    this.setState(() => ({
      disabled: true,
      value: undefined
    }));
  }

  handleMentionOpen() {
    this.setState({ mentionOpen: true });
  }

  handleMentionClose() {
    setTimeout(() => this.setState({ mentionOpen: false }), 100);
  }

  render() {
    const { disabled, value } = this.state;
    const { author, mention } = this.context;
    const { placeholder } = this.props;
    let mentionOptions = null;

    if (mention) {
      mentionOptions = {
        allowedChars: mention.allowedChars,
        mentionDenotationChars: mention.denotationChars,
        onClose: this.handleMentionClose,
        onOpen: this.handleMentionOpen,
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
            ref={(el) => { this.reactQuillRef = el; }}
            className={styles['comment-form-textarea']}
            modules={modules}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={placeholder}
            value={value || ''}
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
