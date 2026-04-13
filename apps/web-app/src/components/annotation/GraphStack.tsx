import { type ElementType, Fragment } from 'react'
import { Ellipse, Line, Rect, Text } from 'react-konva'

import { type EditorTool, useAnnoteStore } from '@/store'

import { getGraphAttr } from './logic'

type GraphRenderer = typeof Line | typeof Rect | typeof Ellipse | typeof Text

const toolGraphMap: Partial<Record<EditorTool, GraphRenderer>> = {
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
        if (!graph.tool) return null

        const Component = toolGraphMap[graph.tool] as ElementType | undefined
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
