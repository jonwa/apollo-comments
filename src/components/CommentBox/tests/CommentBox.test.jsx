/* global describe, it, expect, jest */
import React from 'react';
import { mount } from 'enzyme';
import CommentBox from '../CommentBox';

describe('<CommentBox />', () => {
  describe('template', () => {
    it('should set a value for title', () => {
      const commentBox = mount(<CommentBox />);
      expect(commentBox.prop('title')).toEqual('Comments');
    });
  });
});
