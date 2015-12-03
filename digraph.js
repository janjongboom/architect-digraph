var Path = require('path');
var fs = require('fs');
var promisify = require('es6-promisify');
var co = require('co');

if (!process.argv[2]) {
  throw 'Pass in your architect config file as parameter to architect-digraph';
}

var configFolder = Path.dirname(process.argv[2]);
var config = process.argv[2];

co.wrap(function*() {
  try {
    var pluginPaths = require(config).map(p => {
      if (typeof p === 'object') return p.packagePath;
      return p;
    });

    console.log('digraph G {');
    var plugins = (yield Promise.all(pluginPaths.map(path => {
      return promisify(fs.readFile.bind(fs))(Path.join(configFolder, path, 'package.json'), 'utf-8');
    }))).map(json => JSON.parse(json));

    var all = plugins.reduce((curr, plugin) => {
      curr = curr.concat((plugin.plugin.consumes || []).map(c => {
        return `  "${c}" -> "${plugin.name}"`
      }));
      return curr;
    }, []).join('\n');
    console.log(all);
    console.log('}');
  }
  catch (ex) {
    console.error(ex);
  }

})();
