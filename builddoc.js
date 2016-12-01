const fs = require('fs');
const path = require( 'path' );
const marked = require('marked');
const highlight = require('highlight.js');
const fm = require( 'front-matter' );
const glob = require('glob');
const template = require('art-template');

let docsPath = path.resolve(process.cwd(), 'docs');
let renderer = new marked.Renderer();
template.config('base', __dirname);
template.config('escape', false);

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `<h${level}>${text}</h${level}>\r\n`
}

renderer.code = function(code, lang) {
  var language = lang && (' language-' + lang) || '';
  var rHtml = `<div class="docs-html">${code}</div>` + '\r\n';
  var rCode = '<pre class="docs-code' + language + '">'
    + '<code>' + highlight.highlightAuto(code).value + '</code>'
    + '</pre>\r\n';
  return rHtml + rCode + '\r\n';
}

renderer.table = function(header, body){
  return `<table class="docs-table">${header} ${body}</table>`;
}
let data = {
  nav: {
    base: ['button', 'border'],
    layout: ['margin', 'padding', 'column'],
    form: ['input', 'textarea', 'select', 'radio', 'checkbox'],
    js: ['birthday']
  }
};

var i = 0;
glob('*.md',{cwd: docsPath}, function(err, files){
  files.forEach(function(filename){
    fs.readFile(path.resolve(docsPath, filename), function(err, file){
      let mdBody = fm(file.toString()).body;
      let html = marked(mdBody);
      let htmlFilename = filename.replace('.md', '');
      data.main = html;
      data.now = htmlFilename;
      let fullHtml = template('site/_index', data);
      fs.writeFile(`./site/${htmlFilename}.html`, fullHtml);
    });
  })
})



