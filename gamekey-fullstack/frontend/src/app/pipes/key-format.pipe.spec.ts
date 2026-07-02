import { KeyFormatPipe } from './key-format.pipe';

describe('KeyFormatPipe', () => {
  const pipe = new KeyFormatPipe();

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats a raw key string into hyphenated 4-char blocks', () => {
    expect(pipe.transform('a3f9b21c4de79901cc84')).toBe('A3F9-B21C-4DE7-9901-CC84');
  });

  it('returns an empty string for undefined input', () => {
    expect(pipe.transform(undefined)).toBe('');
  });
});
