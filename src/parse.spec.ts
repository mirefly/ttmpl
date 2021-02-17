import parse from './parse';

describe(__filename, () => {
  it('parses correctly', () => {
    const rv = parse(['in', 'out', '--', 'c=1', 'd=dvalue']);
    expect(rv).toEqual({
      templateName: 'in',
      outputPath: 'out',
      data: { c: '1', d: 'dvalue' },
    });
  });

  it('parses the case without data', () => {
    const rv = parse(['in', 'out']);
    expect(rv).toEqual({
      templateName: 'in',
      outputPath: 'out',
      data: {},
    });
  });

  it('thros error if missing one path', () => {
    expect(() => parse(['in'])).toThrowError(/Usage/);
  });

  it('thros error if no value in key-value pair', () => {
    expect(() => parse(['in', 'out', '--', 'a'])).toThrowError(/Usage/);
  });
});
