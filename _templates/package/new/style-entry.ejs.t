---
inject: true
to: src/styles/index.scss
append: true
skip_if: "<%= h.changeCase.param(name) %>"
---
@import "<%= h.changeCase.param(name) %>";