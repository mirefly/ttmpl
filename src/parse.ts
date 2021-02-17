import minimist from 'minimist';

const usageText = `Usage: ttmpl <template name> <output path> [-- key1=value1 [key2=value2 ...]]`;

export type Data = { [key: string]: string };

const parse = (input: string[]) => {
  const argv = minimist(input, {
    '--': true,
  });
  if (argv._.length !== 2) {
    throw new Error(usageText);
  }

  const data: Data = {};

  argv['--']?.map((kv) => {
    const [k, v] = kv.split('=');
    data[k] = v;

    if (typeof v === 'undefined') {
      throw new Error(usageText);
    }
  });

  return {
    templateName: String(argv._[0]),
    outputPath: String(argv._[1]),
    data,
  };
};

export default parse;
