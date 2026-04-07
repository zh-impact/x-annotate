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

type State = {
  editorControl: {
    color: string
    strokeWidth: number
  }
  editorTool: EditorTool
  annotationCanvas: {
    initialized: boolean
    width: number
    height: number
    fileUrl: string | null
  }
  currentGraph: Graph | null
  graphStack: Graph[]
}

type Actions = {
  setCurrentGraph: (graph: Graph | ((prev: Graph | null) => Graph)) => void
  pushGraph: (graph: Graph) => void
  resetCurrentGraph: () => void
  setEditorTool: (tool: EditorTool) => void
  setEditorControl: (control: Partial<State['editorControl']>) => void
  setCanvas: (canvas: State['annotationCanvas']) => void
}

export type AnnoteStore = State & Actions

export const useAnnoteStore = create<AnnoteStore>((set) => ({
  editorControl: {
    color: '#a855f7',
    strokeWidth: 2,
  },
  editorTool: 'pencil' as EditorTool,
  annotationCanvas: { initialized: false, width: 640, height: 480, fileUrl: null },
  currentGraph: null as Graph | null,
  graphStack: [] as Graph[],
  setCurrentGraph: (graph) =>
    set((state) => ({
      currentGraph: typeof graph === 'function' ? graph(state.currentGraph) : graph,
    })),
  pushGraph: (graph) => set((state) => ({ graphStack: [...state.graphStack, graph] })),
  resetCurrentGraph: () => set({ currentGraph: null }),
  setEditorTool: (tool: EditorTool) => set({ editorTool: tool }),
  setEditorControl: (control: Partial<State['editorControl']>) =>
    set((state) => ({ editorControl: { ...state.editorControl, ...control } })),
  setCanvas: (canvas) => set({ annotationCanvas: { ...canvas } }),
}))
