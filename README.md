# ttmpl

Simple code generator based on [EJS](https://ejs.co/)

## Usage

```bash
npx ttmpl <template-name> <output-path> [-- key=value ...]
```

The template files have to be placed in `.ttmpl` folder which can be either in
the repository or in your `$HOME` folder. The template name can be any file name
or folder name in `.ttmpl`.

```
my-project
├── .ttmpl
│   ├── simple-component.tsx.ejs
│   └── new-component
│       ├── index.tsx.ejs
│       ├── styles.scss.ejs
│       ├── index.test.tsx.ejs
│       └── index.stories.tsx.ejs
└── src
    └── components
```
