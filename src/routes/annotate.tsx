import { useAtomValue } from 'jotai';
import { createFileRoute } from '@tanstack/react-router';
import { Stage, Layer } from 'react-konva';

import { StartEntry } from '@/features/StartEntry';
import { EditorControls } from '@/features/EditorControls';
import { ToolBox } from '@/features/EditorTools';
import { Annotation } from '@/features/Annotation';

import { annotationCanvasAtom } from '@/atoms';

import { useDrawing } from '@/hooks/useDrawing';

export const Route = createFileRoute('/annotate')({
  component: Annotate,
});

function Annotate() {
  const annotationCanvas = useAtomValue(annotationCanvasAtom);
  const { handleDrawStart, handleDrawing, handleDrawEnd } = useDrawing();

  return (
    <div className="h-screen">
      <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
        <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
          <i className="text-2xl text-purple-500 font-bold pl-4">
            X-Annotation
          </i>
          <EditorControls />
        </div>

        <div className="sidebar bg-slate-100 py-4">
          <ToolBox />
        </div>

        <div className="content flex-grow bg-slate-200">
          {annotationCanvas.initialized ? (
            <div className="h-full flex items-center justify-center">
              <div
                className={`w-[${annotationCanvas.width}px] h-[${annotationCanvas.height}px]`}
              >
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
  );
}
