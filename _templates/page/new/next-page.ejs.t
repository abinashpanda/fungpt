---
to: "src/pages/<%= name === 'home' ? 'index' : `${name}` %>.tsx"
---
<% if (isServerRendered) { -%>
import { GetServerSidePropsResult, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/server/auth'
import type { <%= h.changeCase.pascal(name) %>Props } from '~/page-components/<%= name %>'
<% } -%>
import <%= h.changeCase.pascal(name) %> from '~/page-components/<%= name %>'

<% if (isServerRendered) { %>
type <%= h.changeCase.pascal(name) %>PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

<% } -%>
<% if (isServerRendered) { -%>
export default function <%= h.changeCase.pascal(name) %>Page({ title }: <%= h.changeCase.pascal(name) %>PageProps) {
  return (
    <<%= h.changeCase.pascal(name) %> title={title} />
  )
}
<% } else { -%>
export default function <%= h.changeCase.pascal(name) %>Page() {
  return (
    <<%= h.changeCase.pascal(name) %> />
  )
}
<% } -%>
<% if (isServerRendered) { -%>

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<<%= h.changeCase.pascal(name) %>Props>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await getServerSession(context.req, context.res, authOptions)
  return {
    props: {
      title: '<%= h.changeCase.sentence(name) %>',
    }
  }
}
<% } -%>