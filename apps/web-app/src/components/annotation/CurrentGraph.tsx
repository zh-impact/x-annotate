import { Ellipse, Line, Rect } from 'react-konva'
import type Konva from 'konva'

import { useAnnoteStore, type EditorTool } from '@/store'

import { getGraphAttr } from './logic'

const toolGraphMap: Partial<Record<EditorTool, React.FC>> = {
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
}

export default function CurrentGraph() {
  const tool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)!

  const graphAttr = getGraphAttr(currentGraph) as Konva.EllipseConfig
  const RenderTool = toolGraphMap[tool]
  if (!RenderTool) return null

  return (
    <RenderTool
      {...graphAttr}
      stroke={currentGraph.color}
      strokeWidth={currentGraph.strokeWidth}
    />
  )
}
