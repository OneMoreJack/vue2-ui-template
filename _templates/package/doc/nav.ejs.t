---
inject: true
to: docs/nav.config.json
after: <%= type %>
skip_if: "<%= type %>/<%= name %>"
---
    "<%= type %>/<%= name %>",