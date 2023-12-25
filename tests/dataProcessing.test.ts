import {
  inputValidation,
  transformInputValue,
  updateConfig,
} from '../bin/dataProcessing';
import { queries, defaults } from '../bin/constants';

describe('dataProcessing', () => {
  describe('inputValidation', () => {
    it.each([
      ['dir', 'dist'],
      ['user', 'JohnDoe johndoe@example.com'],
      ['src', 'index.js'],
      ['user', 'invalidemail'],
      ['src', 'invalidformat'],
    ])('validates user input for option %s and value %s', (option, value) => {
      const index = queries.findIndex((q) => q.option === option);
      const expected = queries[index].pattern.test(value);
      expect(inputValidation(value, index)).toBe(expected);
    });
  });

  describe('transformInputValue', () => {
    it('converts the value for index 1 (user)', () => {
      const value = 'JohnDoe johndoe@example.com';
      expect(transformInputValue(value, 1)).toEqual({
        name: 'JohnDoe',
        email: 'johndoe@example.com',
      });
    });

    it('converts value to index 6 (boolean)', () => {
      expect(transformInputValue('y', 6)).toBe(true);
      expect(transformInputValue('n', 6)).toBe(false);
    });
  });

  describe('updateConfig', () => {
    it('updates the configuration for index 1', () => {
      const value = { name: 'JohnDoe', email: 'johndoe@example.com' };
      const newConfig = updateConfig(value, 1, defaults);
      expect(newConfig).toEqual({ ...defaults, user: value });
    });
  });
});
