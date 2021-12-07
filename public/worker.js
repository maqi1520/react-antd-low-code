importScripts('https://unpkg.com/prettier@2.2.1/standalone.js');
importScripts('https://unpkg.com/prettier@2.2.1/parser-babel.js');

self.addEventListener(
  'message',
  function (e) {
    self.postMessage(
      prettier.format(e.data, {
        parser: 'babel',
        plugins: prettierPlugins,
      })
    );
  },
  false
);
