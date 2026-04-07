import { create } from 'zustand'

export type EditorTool = 'move' | 'pencil' | 'eraser' | 'line' | 'ellipse' | 'rect' | 'text'

// Graph

type Point = [number, number]
export type Points = Point[]

export type PointPair = number[]

export type Graph = {
  tool?: EditorTool
  points: PointPair
  color?: string
  strokeWidth?: number
  draggable?: boolean
  text?: string
}

export const useAnnoteStore = create((set) => ({
  color: '#a855f7',
  strokeWidth: 2,
  editorTool: 'pencil' as EditorTool,
  annotationCanvas: { initialized: false, width: 640, height: 480, fileUrl: null },
  currentGraph: null as Graph | null,
  graphStack: [] as Graph[],
}))
