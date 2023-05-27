---
to: src/page-components/<%= name %>/<%= name %>.tsx
---
<% if (isServerRendered) { -%>
export type <%= h.changeCase.pascal(name) %>Props = {
  title: string
}

<% } -%>
<% if (isServerRendered) { -%>
export default function <%= h.changeCase.pascal(name) %>({ title } : <%= h.changeCase.pascal(name) %>Props) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
<% } else { -%>
export default function <%= h.changeCase.pascal(name) %>() {
  return (
    <div>
      <h1><%= h.changeCase.sentence(name) %></h1>
    </div>
  )
}
<% } -%>