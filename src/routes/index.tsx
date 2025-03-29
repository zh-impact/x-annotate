import { useAtomValue } from 'jotai';
import { createFileRoute } from '@tanstack/react-router';
import { Stage, Layer } from 'react-konva';

import { EditorControls } from '../features/EditorControls';
import { ToolBox } from '../features/EditorTools';
import { StartEntry } from '../features/StartEntry';

import { annotateCanvasState } from '../atoms';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const annotation = useAtomValue(annotateCanvasState);

  const handleMouseMove = () => {};
  const handleMouseDown = () => {};
  const handleMouseUp = () => {};

  return (
    <div className="h-screen">
      <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
        <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
          <i className="text-2xl text-purple-500 font-bold pl-4">
            X-Annotation
          </i>
          <EditorControls />
        </div>

        <div className="sidebar bg-slate-400 py-4">
          <ToolBox />
        </div>

        <div className="content flex-grow bg-slate-500">
          {annotation.initialized ? (
            <div className="h-full flex items-center justify-center">
              <div
                className={`w-[${annotation.width}px] h-[${annotation.height}px]`}
              >
                <Stage
                  width={annotation.width}
                  height={annotation.height}
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="bg-white"
                >
                  <Layer></Layer>
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
