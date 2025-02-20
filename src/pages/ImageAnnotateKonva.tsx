import type Konva from "konva";
import { Stage, Layer } from "react-konva";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import URLImage from "@/components/URLImage";

import EditorControls from "@/features/EditorControls";
import EditorTools from "@/features/EditorTools";
import AnnotateCanvas from "@/features/AnnotateCanvas";
import StartEntry from "@/features/StartEntry";

import { annotationState } from "@/store/annotation";
import { editorControlsState } from "@/store/editorControl";
import { editorToolState, ToolType } from "@/store/editorTool";
import { activeGraphState } from "@/store/graphCurrent";
import { graphStackState } from "@/store/graphStack";

export default function ImageAnnotateKonva() {
  const annotation = useRecoilValue(annotationState);
  const [tool] = useRecoilState(editorToolState);
  const controls = useRecoilValue(editorControlsState);
  const [activeGraph, setActiveGraph] = useRecoilState(activeGraphState);
  const setHistoryGraphs = useSetRecoilState(graphStackState);

  const drawGraph: ToolType[] = ["line", "rect", "ellipse"];
  const freeDrawTools: ToolType[] = ["pencil", "eraser"];

  const handleMouseDown = (options: Konva.KonvaEventObject<MouseEvent>) => {
    const { layerX: x, layerY: y } = options.evt;
    if (tool === "move") return;

    if (freeDrawTools.includes(tool)) {
      setActiveGraph({
        tool,
        points: [x, y],
        ...controls,
      });
      return;
    }

    if (drawGraph.includes(tool)) {
      if (!activeGraph.points?.length) {
        setActiveGraph({
          tool,
          points: [x, y],
          ...controls,
        });
      } else if (activeGraph.points?.length === 2) {
        setActiveGraph((prev) => ({
          ...prev,
          points: [...prev.points, x, y],
        }));
      } else {
        setHistoryGraphs((prev) => [...prev, activeGraph]);
        setActiveGraph({ tool, points: [] });
      }
    }
    if (tool === "text") {
      setActiveGraph({ tool, points: [x, y] });
    }
  };

  const handleMouseMove = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "move") return;

    if (freeDrawTools.includes(tool) && activeGraph.points?.length) {
      const { layerX: x, layerY: y } = options.evt;
      setActiveGraph((prev) => ({
        ...prev,
        points: [...prev.points, x, y],
      }));
      return;
    }

    if (drawGraph.includes(tool) && activeGraph.points?.length) {
      setActiveGraph((prev) => ({
        ...prev,
        points: [
          prev.points[0],
          prev.points[1],
          options.evt.layerX,
          options.evt.layerY,
        ],
      }));
    }
  };

  const handleMouseUp = () => {
    if (freeDrawTools.includes(tool) && activeGraph.points?.length) {
      setHistoryGraphs((prev) => [...prev, activeGraph]);
      setActiveGraph({ tool, points: [] });
    }
  };

  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
      <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
        <i className="text-2xl text-purple-500 font-bold pl-4">X-Annotate</i>
        <EditorControls />
      </div>

      <div className="sidebar bg-slate-400 py-4">
        <EditorTools />
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="bg-white"
              >
                <Layer>
                  {annotation.fileUrl && <URLImage src={annotation.fileUrl} />}
                  <AnnotateCanvas />
                </Layer>
              </Stage>
            </div>
          </div>
        ) : (
          <StartEntry />
        )}
      </div>
    </div>
  );
}
