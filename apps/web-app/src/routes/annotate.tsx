import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Layer, Stage } from 'react-konva'
import { Annotation } from '@/components/annotation'
import { EditorControl } from '@/components/editor-control'
import { EditorTool } from '@/components/editor-tool'
import { StartEntry } from '@/components/start-entry'
import { useDrawing } from '@/hooks/useDrawing'
import { useAnnoteStore } from '@/store'

export const Route = createFileRoute('/annotate')({
  component: RouteComponent,
})

function RouteComponent() {
  const annotationCanvas = useAnnoteStore((state) => state.annotationCanvas)
  const { handleDrawStart, handleDrawing, handleDrawEnd } = useDrawing()

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false
      }

      return (
        target.isContentEditable ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      )
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || isEditableTarget(event.target)) {
        return
      }

      if (!event.ctrlKey && !event.metaKey) {
        return
      }

      const key = event.key.toLowerCase()
      if (key !== 'z' && key !== 'y') {
        return
      }

      const state = useAnnoteStore.getState()
      if (!state.annotationCanvas.initialized) {
        return
      }

      const shouldRedo = key === 'y' || (key === 'z' && event.shiftKey)

      if (shouldRedo) {
        if (!state.history.future.length) {
          return
        }

        event.preventDefault()
        state.redo()
        return
      }

      if (!state.currentGraph && !state.history.past.length) {
        return
      }

      event.preventDefault()
      state.undo()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="h-[calc(100vh-41px)]">
      <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
        <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
          <i className="text-2xl text-purple-500 font-bold pl-4">X-Annotation</i>
          <EditorControl />
        </div>

        <div className="sidebar bg-slate-100 py-4">
          <EditorTool />
        </div>

        <div className="content grow bg-blue-200">
          {annotationCanvas.initialized ? (
            <div className="h-full flex pt-10 pl-10">
              <div className={`w-[${annotationCanvas.width}px] h-[${annotationCanvas.height}px]`}>
                <Stage
                  width={annotationCanvas.width}
                  height={annotationCanvas.height}
                  onMouseDown={handleDrawStart}
                  onMouseMove={handleDrawing}
                  onMouseUp={handleDrawEnd}
                  onMouseLeave={handleDrawEnd}
                  className="bg-white"
                >
                  <Layer>
                    <Annotation />
                  </Layer>
                </Stage>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
              <StartEntry />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
