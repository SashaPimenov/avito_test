import { getTaskCountColor } from '@utils/getTaskCountColor';
import { describe, it, expect } from 'vitest';

describe('getTaskCountColor', () => {
  it('should return "default" for count 0', () => {
    expect(getTaskCountColor(0)).toBe('default');
  });

  it('should return "green" for count between 1 and 3', () => {
    expect(getTaskCountColor(1)).toBe('green');
    expect(getTaskCountColor(2)).toBe('green');
    expect(getTaskCountColor(3)).toBe('green');
  });

  it('should return "blue" for count between 4 and 7', () => {
    expect(getTaskCountColor(4)).toBe('blue');
    expect(getTaskCountColor(5)).toBe('blue');
    expect(getTaskCountColor(7)).toBe('blue');
  });

  it('should return "orange" for count between 8 and 10', () => {
    expect(getTaskCountColor(8)).toBe('orange');
    expect(getTaskCountColor(9)).toBe('orange');
    expect(getTaskCountColor(10)).toBe('orange');
  });

  it('should return "red" for count above 10', () => {
    expect(getTaskCountColor(11)).toBe('red');
    expect(getTaskCountColor(100)).toBe('red');
  });

  it('should handle negative numbers', () => {
    expect(getTaskCountColor(-1)).toBe('default');
  });
});
