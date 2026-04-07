import { Fragment } from 'react'
import { Ellipse, Line, Rect, Text } from 'react-konva'

import { useAnnoteStore, type EditorTool } from '@/store'

import { getGraphAttr } from './logic'

const toolGraphMap: Partial<Record<EditorTool, React.FC>> = {
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
  text: Text,
  pencil: Line,
  eraser: Line,
}

export default function GraphStack() {
  const control = useAnnoteStore((s) => s.editorControl)
  const graphStack = useAnnoteStore((s) => s.graphStack)

  return (
    <>
      {graphStack.map((graph, index) => {
        const Component = toolGraphMap[graph.tool!]
        if (!Component) return null
        return (
          <Fragment key={index}>
            <Component {...getGraphAttr(graph, control)} />
          </Fragment>
        )
      })}
    </>
  )
}
