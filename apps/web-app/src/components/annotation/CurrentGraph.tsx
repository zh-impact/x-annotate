import type Konva from 'konva'
import type { ElementType } from 'react'
import { Ellipse, Line, Rect } from 'react-konva'

import { type EditorTool, useAnnoteStore } from '@/store'

import { getGraphAttr } from './logic'

type GraphRenderer = typeof Line | typeof Rect | typeof Ellipse

const toolGraphMap: Partial<Record<EditorTool, GraphRenderer>> = {
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
}

export default function CurrentGraph() {
  const tool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)

  if (!currentGraph) return null

  const graphAttr = getGraphAttr(currentGraph) as Konva.EllipseConfig
  const RenderTool = toolGraphMap[tool] as ElementType | undefined
  if (!RenderTool) return null

  return (
    <RenderTool {...graphAttr} stroke={currentGraph.color} strokeWidth={currentGraph.strokeWidth} />
  )
}
