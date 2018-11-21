/* global describe, it, expect, jest */
import React from 'react';
import { mount } from 'enzyme';
import Comment from '../Comment';

describe('<Comment />', () => {
  describe('text', () => {
    it('should use default value for text', () => {
      const comment = mount(<Comment />);
      expect(comment.prop('id')).toBe(undefined);
    });
  });
});
