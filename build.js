'use strict';

const Metalsmith   = require('metalsmith');
const autoprefixer = require('metalsmith-autoprefixer');
const permalinks   = require('metalsmith-permalinks');
const layouts      = require('metalsmith-layouts');
// const cleanCSS     = require('metalsmith-clean-css');
const copy         = require('metalsmith-copy');
const mdattrs      = require('markdown-it-attrs');
const mdFoot       = require('markdown-it-footnote');
const sass         = require('metalsmith-sass');

let markdown       = require('metalsmith-markdownit');
let md = markdown('default');
md.parser.use(mdattrs).use(mdFoot);

new Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Georgian Typography & Type Design',
      url: 'https://alex-ketch.github.io/GeoType/'
    }
  })
  .ignore(['_*.styl', '_*.css', '*.pug', '.DS_Store'])
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'compact', // nested, expanded, compact, compressed
    precision: 8
  }))
  .use(autoprefixer())
  .use(copy({
    'pattern': 'assets/styl/*',
    'directory': 'assets/css',
    'move': true
  }))
  .use(md)
  .use(permalinks({
    pattern: ':title',
    relative: 'false'
  }))
  .use(layouts({
    'default': 'default.pug',
    'directory': './src/layouts',
    'engine': 'pug',
    'partials': 'includes',
    'pattern': '**/*.html'
  }))
  .build((err) => {
    if (err) {
      throw err;
    } else {
      console.log('The cast is forged!'); // eslint-disable-line
    }
  });
