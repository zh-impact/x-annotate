import { Line } from 'react-konva'

import { useAnnoteStore } from '@/store'

export default function FreeDraw() {
  const tool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)
  const control = useAnnoteStore((s) => s.editorControl)

  if (tool !== 'pencil' || !currentGraph?.points?.length) return null

  return (
    <Line
      points={currentGraph.points}
      stroke={control.color}
      strokeWidth={control.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation="source-over"
    />
  )
}
