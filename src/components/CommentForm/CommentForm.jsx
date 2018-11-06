import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Form,
  FormGroup,
  TextArea
} from '@afconsult/apollo';
import * as styles from './CommentForm.css';

const propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string,
};

const defaultProps = {
  onSubmit: undefined,
  placeholder: 'Write a comment...',
  submitLabel: 'Post',
};

const contextTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    imageUrl: PropTypes.string,
    url: PropTypes.string
  })
};

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { disabled: true };
    this._textareaRef = React.createRef();
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { current: textarea } = this._textareaRef;
    textarea.style.overflowY = 'hidden';
    textarea.style.boxSizing = 'border-box';
    textarea.style.mozBoxSizing = 'border-box';
    textarea.addEventListener('keyup', this.handleKeyup);
    textarea.addEventListener('keydown', this.handleKeydown);
    textarea.addEventListener('input', this.handleResize);
    textarea.addEventListener('resize', this.handleResize);
  }

  onComponentDidUnmount() {
    const { current: textarea } = this._textareaRef;
    textarea.removeEventListener('keyup', this.handleKeyup);
    textarea.removeEventListener('keydown', this.handleKeydown);
    textarea.removeEventListener('input', this.handleResize);
    textarea.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { current: textarea } = this._textareaRef;
    textarea.style.height = 0;
    const minHeight = textarea.scrollHeight;
    const outerHeight = parseInt(window.getComputedStyle(textarea).height, 10);
    const diff = outerHeight - textarea.clientHeight;
    textarea.style.height =
      `${Math.max(minHeight, textarea.scrollHeight + diff)}px`;
  }

  handleKeyup() {
    const { current: textarea } = this._textareaRef;
    this.setState({ disabled: textarea.value === '' });
  }

  handleKeydown(e) {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    const { onSubmit } = this.props;
    const { current: textarea } = this._textareaRef;

    if (!onSubmit) {
      e.preventDefault();
      return;
    }

    if (textarea.value) {
      onSubmit(textarea.value);
      textarea.value = '';

      this.setState({ disabled: true });
      this.handleResize();
    }
  }

  render() {
    const { disabled } = this.state;
    const { author } = this.context;
    const { placeholder, submitLabel } = this.props;

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
          <TextArea
            innerRef={this._textareaRef}
            placeholder={placeholder}
            resize="none"
            rows="1"
          />
        </FormGroup>
        <FormGroup className={styles['comment-form-group']}>
          <Button
            className={styles['button-submit']}
            color="primary"
            disabled={disabled}
            onClick={this.handleSubmit}
          >{submitLabel}
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
