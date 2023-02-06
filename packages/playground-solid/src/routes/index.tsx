import { createResource } from 'solid-js'
import { A, Title, useRouteData } from 'solid-start'
import { ExamplesType, resolveAllExamples } from '../../utils/resolve-all-examples'

export function routeData() {
  const [examples] = createResource(async () => {
    const response = await resolveAllExamples('src/routes')
    return await response
  })

  return { examples }
}

export default function Home() {
  const { examples } = useRouteData<typeof routeData>()

  return (
    <>
      <Title>Examples</Title>
      <div class="container mx-auto my-24">
        <div class="prose">
          <h2>Examples</h2>
          {examples() && <Examples examples={examples()} />}
        </div>
      </div>
    </>
  )
}

export function Examples(props: { examples: ExamplesType[] }) {
  const { examples } = props
  return (
    <ul>
      {examples.map((example) => (
        <li>
          {example.children ? (
            <h3 class="text-xl capitalize">{example.name}</h3>
          ) : (
            <A href={example.path} class="capitalize">
              {example.name}
            </A>
          )}
          {example.children && <Examples examples={example.children} />}
        </li>
      ))}
    </ul>
  )
}
