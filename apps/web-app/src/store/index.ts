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

type GraphHistory = {
  past: Graph[][]
  future: Graph[][]
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
  history: GraphHistory
}

type Actions = {
  setCurrentGraph: (graph: Graph | ((prev: Graph | null) => Graph)) => void
  pushGraph: (graph: Graph) => void
  undo: () => void
  redo: () => void
  resetCurrentGraph: () => void
  setEditorTool: (tool: EditorTool) => void
  setEditorControl: (control: Partial<State['editorControl']>) => void
  setCanvas: (canvas: State['annotationCanvas']) => void
}

export type AnnoteStore = State & Actions

const emptyHistory = (): GraphHistory => ({
  past: [],
  future: [],
})

export const useAnnoteStore = create<AnnoteStore>((set) => ({
  editorControl: {
    color: '#a855f7',
    strokeWidth: 2,
  },
  editorTool: 'pencil' as EditorTool,
  annotationCanvas: { initialized: false, width: 640, height: 480, fileUrl: null },
  currentGraph: null as Graph | null,
  graphStack: [] as Graph[],
  history: emptyHistory(),
  setCurrentGraph: (graph) =>
    set((state) => ({
      currentGraph: typeof graph === 'function' ? graph(state.currentGraph) : graph,
    })),
  pushGraph: (graph) =>
    set((state) => ({
      graphStack: [...state.graphStack, graph],
      history: {
        past: [...state.history.past, state.graphStack],
        future: [],
      },
    })),
  undo: () =>
    set((state) => {
      if (state.currentGraph) {
        return { currentGraph: null }
      }

      if (!state.history.past.length) {
        return {}
      }

      const previousGraphStack = state.history.past[state.history.past.length - 1]

      return {
        graphStack: previousGraphStack,
        history: {
          past: state.history.past.slice(0, -1),
          future: [state.graphStack, ...state.history.future],
        },
      }
    }),
  redo: () =>
    set((state) => {
      if (!state.history.future.length) {
        return {}
      }

      const nextGraphStack = state.history.future[0]

      return {
        graphStack: nextGraphStack,
        history: {
          past: [...state.history.past, state.graphStack],
          future: state.history.future.slice(1),
        },
      }
    }),
  resetCurrentGraph: () => set({ currentGraph: null }),
  setEditorTool: (tool: EditorTool) => set({ editorTool: tool }),
  setEditorControl: (control: Partial<State['editorControl']>) =>
    set((state) => ({ editorControl: { ...state.editorControl, ...control } })),
  setCanvas: (canvas) =>
    set({
      annotationCanvas: { ...canvas },
      currentGraph: null,
      graphStack: [],
      history: emptyHistory(),
    }),
}))
