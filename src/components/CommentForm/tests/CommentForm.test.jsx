/* global describe, it, expect, jest */
import React from 'react';
import { mount } from 'enzyme';
import CommentForm from '../CommentForm';

describe('<CommentForm />', () => {
  describe('template', () => {
    it('is expect activeUser to be null', () => {
      const commentForm = mount(<CommentForm />);
      expect(commentForm.prop('placeholder')).toEqual('Write a comment...');
    });
  });
});
