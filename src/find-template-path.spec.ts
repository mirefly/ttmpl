import mockFs from 'mock-fs';
import findTemplatePaths, {
  getRelevantDirectories,
} from './find-template-path';

mockFs({
  '/outside/root/sub1/sub2': {
    txt: 'content a',
    sub3: mockFs.directory(),
  },
  '/outside/root/.git': {},
});

describe(__filename, () => {
  afterAll(() => {
    mockFs.restore();
  });

  describe('getRelevantDirectories', () => {
    it('returns subdirectories of the current repository', () => {
      expect(getRelevantDirectories('/outside/root/sub1/sub2')).toStrictEqual([
        '/outside/root/sub1/sub2',
        '/outside/root/sub1',
        '/outside/root',
      ]);
    });

    it('returns home directory if not in repository', () => {
      expect(getRelevantDirectories('/outside')).toStrictEqual(['/']);
    });
  });

  it('findTemplatePaths', () => {
    process.cwd = jest.fn(() => '/outside/root/sub1');
    expect(findTemplatePaths('tmpl_name')).toStrictEqual([
      '/outside/root/sub1/.ttmpl/tmpl_name',
      '/outside/root/sub1/.ttmpl/tmpl_name.ejs',
      '/outside/root/.ttmpl/tmpl_name',
      '/outside/root/.ttmpl/tmpl_name.ejs',
    ]);
  });
});
