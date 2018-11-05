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

const userPropType = PropTypes.shape({
  displayName: PropTypes.string,
  imageUrl: PropTypes.string,
  redirectUrl: PropTypes.string
});

const propTypes = {
  activeUser: userPropType,
  buttonText: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = {
  activeUser: null,
  buttonText: 'Post',
  placeholder: 'Write a comment...',
};

const contextTypes = {
  onAdd: PropTypes.func,
};

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { empty: true };

    this._formRef = React.createRef();
    this._textareaRef = React.createRef();


    this.handleResize = this.handleResize.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { current } = this._textareaRef;

    current.style.boxSizing = 'border-box';
    current.style.mozBoxSizing = 'border-box';
    current.style.overflowY = 'hidden';

    current.addEventListener('keydown', this.handleKeyDown);
    current.addEventListener('input', this.handleResize);
    current.addEventListener('resize', this.handleResize);
  }

  onComponentDidUnmount() {
    const { current } = this._textareaRef;
    current.removeEventListener('keydown', this.handleKeyDown);
    current.removeEventListener('input', this.handleResize);
    current.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { current } = this._textareaRef;
    current.style.height = 0;
    const minHeight = current.scrollHeight;
    const outerHeight = parseInt(window.getComputedStyle(current).height, 10);
    const diff = outerHeight - current.clientHeight;
    current.style.height = `${Math.max(minHeight, current.scrollHeight + diff)}px`;
  }

  handleKeyDown(e) {
    const { current } = this._textareaRef;

    if (e.ctrlKey && e.keyCode === 8) { // ctrl-backspace
      // TODO(jon): Remove word by word.
    }

    if (!e.shiftKey && e.keyCode === 13) { // enter
      e.preventDefault();
      this.handleSubmit(e);
      this.handleResize();

      const txtFile = new File('text.txt');
      txtFile.writeln(current.value);
      txtFile.close();
      return;
    }

    this.setState({ empty: current.value === '' });
  }

  handleSubmit(e) {
    const { onAdd } = this.context;
    if (!onAdd) {
      e.preventDefault();
      return;
    }

    const { current } = this._textareaRef;
    if (!current.value) {
      return;
    }

    onAdd(current.value);

    current.value = '';
    this.setState({ empty: true });
  }

  render() {
    const { empty } = this.state;
    const {
      activeUser: {
        displayName,
        imageUrl,
      },
      buttonText,
      placeholder,
    } = this.props;

    const formGroupClasses = styles['comment-form-group'];

    return (
      <Form
        className={styles['comment-form']}
        innerRef={this._formRef}
      >
        <FormGroup className={formGroupClasses}>
          <Avatar
            name={displayName}
            size="medium"
            src={imageUrl}
          />
        </FormGroup>
        <FormGroup className={formGroupClasses}>
          <TextArea
            innerRef={this._textareaRef}
            placeholder={placeholder}
            resize="none"
            rows="1"
          />
        </FormGroup>
        <FormGroup className={formGroupClasses}>
          <Button
            className={styles['button-post-comment']}
            color="primary"
            disabled={empty}
            onClick={this.handleSubmit}
          >{buttonText}
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
