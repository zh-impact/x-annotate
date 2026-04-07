import { Stage, Layer } from 'react-konva'
import { createFileRoute } from '@tanstack/react-router'

import { EditorControl } from '@/components/editor-control'
import { EditorTool } from '@/components/editor-tool'
import { Annotation } from '@/components/annotation'
import { useAnnoteStore } from '@/store'
import { useDrawing } from '@/hooks/useDrawing'
import { StartEntry } from '@/components/start-entry'

export const Route = createFileRoute('/annotate')({
  component: RouteComponent,
})

function RouteComponent() {
  const annotationCanvas = useAnnoteStore((state) => state.annotationCanvas)
  const { handleDrawStart, handleDrawing, handleDrawEnd } = useDrawing()

  return (
    <div className="p-2">
      <div className="h-screen">
        <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
          <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
            <i className="text-2xl text-purple-500 font-bold pl-4">X-Annotation</i>
            <EditorControl />
          </div>

          <div className="sidebar bg-slate-100 py-4">
            <EditorTool />
          </div>

          <div className="content flex-grow bg-slate-200">
            {annotationCanvas.initialized ? (
              <div className="h-full flex items-center justify-center">
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
              <StartEntry />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
