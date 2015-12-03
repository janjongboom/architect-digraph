# architect-digraph

Creates dependency diagram of your [architect](https://github.com/c9/architect) application.

## Usage

```
npm install architect-digraph
node node_modules/architect-digraph/digraph.js config/my-architect-config.js
```

It will write the dependencies to stdout. Feed this into a visualizer like [GraphvizFiddle](https://stamm-wilbrandt.de/GraphvizFiddle/#) to create a nice graph.
