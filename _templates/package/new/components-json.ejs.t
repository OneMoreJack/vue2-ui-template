---
inject: true
to: components.json
at_line: 1
skip_if: "<%= h.changeCase.param(name) %>"
---
  "<%= h.changeCase.param(name) %>": "packages/<%= h.changeCase.param(name) %>/index.js",