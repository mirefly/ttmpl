import path from 'path';
import fs from 'fs';

const TEMPLATE_DIR = '.ttmpl';

const isRepoRoot = (dir: string) =>
  fs.existsSync(path.join(dir, '.git')) || fs.existsSync(path.join(dir, '.hg'));

export const getRelevantDirectories = (dir: string): string[] => {
  const rv = [dir];

  while (!isRepoRoot(dir)) {
    const parentDir = path.join(dir, '..');
    if (parentDir === dir) {
      return [dir];
    }

    dir = parentDir;
    rv.push(dir);
  }

  return rv;
};

const findTemplatePaths = (templateName: string) => {
  const directories = getRelevantDirectories(process.cwd());

  return directories
    .map((directory) => [
      path.join(directory, TEMPLATE_DIR, templateName),
      path.join(directory, TEMPLATE_DIR, templateName) + '.ejs',
    ])
    .flat();
};

export default findTemplatePaths;
