import path from 'path';
import fs from 'fs';

const TEMPLATE_DIR = '.ttmpl';

const isRepoRoot = (dir: string) =>
  fs.existsSync(path.join(dir, '.git')) || fs.existsSync(path.join(dir, '.hg'));

const findRepoRoot = (dir: string) => {
  while (!isRepoRoot(dir)) {
    const parentDir = path.join(dir, '..');
    if (parentDir === dir) {
      return null;
    }
    dir = parentDir;
  }

  return dir;
};

const findTemplatePaths = (templateName: string) => {
  const root = findRepoRoot(process.cwd());
  return (
    root && [
      path.join(root, TEMPLATE_DIR, templateName),
      path.join(root, TEMPLATE_DIR, templateName) + '.ejs',
    ]
  );
};

export default findTemplatePaths;
