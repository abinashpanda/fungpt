---
to: src/page-components/<%= name %>/index.ts
---
export { default } from './<%= name %>'
export type { <%= h.changeCase.pascal(name) %>Props } from './<%= name %>'
