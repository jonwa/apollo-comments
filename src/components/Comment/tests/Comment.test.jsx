/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';
import Comment from '../Comment';

describe('<Comment />', () => {
  describe('text', () => {
    it('should use default value for text', () => {
      const comment = shallow(<Comment />);
      expect(comment.prop('text')).toBe(undefined);
    });
  });
});
