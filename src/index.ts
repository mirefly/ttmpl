import fs from 'fs-extra';
import ejs from 'ejs';
import path from 'path';

import findTemplatePaths from './find-template-path';
import parse, { Data } from './parse';

type RenderParams = {
  templatePath: string;
  outputPath: string;
  data: Data;
};

const render = ({ templatePath, outputPath, data }: RenderParams) => {
  const templatePathStat = fs.lstatSync(templatePath);

  if (templatePathStat.isFile()) {
    const input = fs.readFileSync(templatePath, 'utf-8');

    try {
      let output = ejs.render(input, data);
      output = output[0] === '\n' ? output.slice(1) : output;
      fs.mkdirpSync(path.dirname(outputPath));
      fs.writeFileSync(outputPath, output);
    } catch (err) {
      const firstLine = input.split('\n')[0] || '';
      const matches = firstLine.match(/<%#(.+)%>/);
      matches && console.log(`[ttmp]: hint : ${matches[1]}`);
      throw err;
    }
  } else if (templatePathStat.isDirectory()) {
    const files = fs.readdirSync(templatePath);
    for (const file of files) {
      const outputFileName = file.endsWith('.ejs')
        ? file.slice(0, file.length - 4)
        : file;
      render({
        templatePath: path.join(templatePath, file),
        outputPath: path.join(outputPath, outputFileName),
        data,
      });
    }
  }
};

const run = () => {
  try {
    const { templateName, outputPath, data } = parse(process.argv.slice(2));

    const templatePaths = findTemplatePaths(templateName);
    const templatePath =
      templatePaths && templatePaths.find((p) => fs.existsSync(p));

    if (!templatePath) {
      throw new Error(`[ttmpl]: fail to find template ${templateName}`);
    }

    if (fs.existsSync(outputPath)) {
      throw new Error(
        `[ttmpl]: fail to create new file ${outputPath}: File exists`,
      );
    }

    render({ templatePath, outputPath, data });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default run;
