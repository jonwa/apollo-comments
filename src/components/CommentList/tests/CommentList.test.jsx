/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';
import CommentList from '../CommentList';

describe('<CommentList />', () => {
  describe('template', () => {
    it('expect children array to be empty', () => {
      const commentList = shallow(<CommentList />);
      expect(commentList.prop('children')).toEqual([]);
    });
  });
});
