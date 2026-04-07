import { Line } from 'react-konva'

import { useAnnoteStore } from '@/store'

import { getGraphAttr } from './logic'

export default function Eraser() {
  const tool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)
  const control = useAnnoteStore((s) => s.editorControl)

  if (tool !== 'eraser' || !currentGraph?.points?.length) return null

  return <Line {...getGraphAttr(currentGraph, control)} />
}
