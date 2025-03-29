import type Konva from 'konva';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import {
  editorToolAtom,
  editorControlAtom,
  currentGraphAtom,
  graphStackAtom,
  type EditorTool,
} from '@/atoms';

export function useDrawing() {
  const editorControl = useAtomValue(editorControlAtom);
  const editorTool = useAtomValue(editorToolAtom);
  const [currentGraph, setCurrentGraph] = useAtom(currentGraphAtom);
  const graphStack = useSetAtom(graphStackAtom);

  const drawGraph: EditorTool[] = ['line', 'rect', 'ellipse'];
  const freeDrawTools: EditorTool[] = ['pencil', 'eraser'];

  const handleDrawStart = (options: Konva.KonvaEventObject<MouseEvent>) => {
    const { layerX: x, layerY: y } = options.evt;
    if (editorTool === 'move') return;

    if (freeDrawTools.includes(editorTool)) {
      setCurrentGraph({
        tool: editorTool,
        points: [x, y],
        ...editorControl,
      });
      return;
    }

    if (drawGraph.includes(editorTool)) {
      if (!currentGraph.points?.length) {
        setCurrentGraph({
          tool: editorTool,
          points: [x, y],
          ...editorControl,
        });
      } else if (currentGraph.points?.length === 2) {
        setCurrentGraph((prev) => ({
          ...prev,
          points: [...prev.points, x, y],
        }));
      } else {
        graphStack((prev) => [...prev, currentGraph]);
        setCurrentGraph({ tool: editorTool, points: [] });
      }
    }
    if (editorTool === 'text') {
      setCurrentGraph({ tool: editorTool, points: [x, y] });
    }
  };

  const handleDrawing = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (editorTool === 'move') return;

    if (freeDrawTools.includes(editorTool) && currentGraph.points?.length) {
      const { layerX: x, layerY: y } = options.evt;
      setCurrentGraph((prev) => ({
        ...prev,
        points: [...prev.points, x, y],
      }));
      return;
    }

    if (drawGraph.includes(editorTool) && currentGraph.points?.length) {
      setCurrentGraph((prev) => ({
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

  const handleDrawEnd = () => {
    if (freeDrawTools.includes(editorTool) && currentGraph.points?.length) {
      graphStack((prev) => [...prev, currentGraph]);
      setCurrentGraph({ tool: editorTool, points: [] });
    }
  };

  return {
    handleDrawStart,
    handleDrawing,
    handleDrawEnd,
  };
}
