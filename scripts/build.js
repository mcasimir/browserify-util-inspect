/* eslint-disable no-sync */
/* eslint-disable node/no-unpublished-require */
const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
const pathmodify = require('pathmodify');
const prependify = require('prependify');
const browserifyDerequire = require('browserify-derequire');

function nodeLibPath(...segments) {
  return path.resolve(__dirname, '..', 'node', 'lib', ...segments);
}

const opts = {
  mods: [
    pathmodify.mod.re(
      /^internal\/(.*)$/,
      nodeLibPath('internal', '$1'),
    ),
  ],
};

const primordials = fs.readFileSync(
  nodeLibPath('internal/per_context/primordials.js'),
  'utf-8',
);

const internalBinding = fs.readFileSync(
  path.resolve(__dirname, './internal-binding.js'),
);

const prepend = [
  'primordials = {}',
  primordials,
  internalBinding,
].join(';\n');

browserify(
  nodeLibPath('internal/util/inspect.js'),
  {
    standalone: 'browserifiedUtilInspect',
  },
)
  .plugin(pathmodify, opts)
  .plugin(prependify, prepend)
  .plugin(browserifyDerequire)
  .bundle()
  .pipe(fs.createWriteStream(path.resolve(__dirname, '..', './inspect.js')));
