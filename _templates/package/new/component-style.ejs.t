---
to: src/styles/<%= h.changeCase.param(name) %>.scss
---
@import "mixins/mixins";
@import "common/var";

@include b(<%= h.changeCase.param(name) %>) {
  
}
