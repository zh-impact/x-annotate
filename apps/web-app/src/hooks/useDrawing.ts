import type Konva from 'konva'

import { type EditorTool, useAnnoteStore } from '@/store'

const drawGraphTools: EditorTool[] = ['line', 'rect', 'ellipse']
const freeDrawTools: EditorTool[] = ['pencil', 'eraser']

export function useDrawing() {
  const editorControl = useAnnoteStore((s) => s.editorControl)
  const editorTool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)
  const setCurrentGraph = useAnnoteStore((s) => s.setCurrentGraph)
  const pushGraph = useAnnoteStore((s) => s.pushGraph)
  const resetCurrentGraph = useAnnoteStore((s) => s.resetCurrentGraph)

  const handleDrawStart = (options: Konva.KonvaEventObject<MouseEvent>) => {
    const { layerX: x, layerY: y } = options.evt
    if (editorTool === 'move') return

    if (freeDrawTools.includes(editorTool)) {
      setCurrentGraph({ tool: editorTool, points: [x, y], ...editorControl })
      return
    }

    if (drawGraphTools.includes(editorTool)) {
      if (!currentGraph?.points?.length) {
        setCurrentGraph({ tool: editorTool, points: [x, y], ...editorControl })
      } else if (currentGraph.points.length === 2) {
        setCurrentGraph((prev) => ({ ...prev!, points: [...prev!.points, x, y] }))
      } else {
        pushGraph(currentGraph)
        resetCurrentGraph()
      }
      return
    }

    if (editorTool === 'text') {
      setCurrentGraph({ tool: editorTool, points: [x, y] })
    }
  }

  const handleDrawing = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (editorTool === 'move') return

    const { layerX: x, layerY: y } = options.evt

    if (freeDrawTools.includes(editorTool) && currentGraph?.points?.length) {
      setCurrentGraph((prev) => ({ ...prev!, points: [...prev!.points, x, y] }))
      return
    }

    if (drawGraphTools.includes(editorTool) && currentGraph?.points?.length) {
      setCurrentGraph((prev) => ({
        ...prev!,
        points: [prev!.points[0], prev!.points[1], x, y],
      }))
    }
  }

  const handleDrawEnd = () => {
    if (freeDrawTools.includes(editorTool) && currentGraph?.points?.length) {
      pushGraph(currentGraph)
      resetCurrentGraph()
    }
  }

  return {
    handleDrawStart,
    handleDrawing,
    handleDrawEnd,
  }
}
