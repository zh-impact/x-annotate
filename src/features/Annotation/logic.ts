import type Konva from 'konva';

import { type Graph, EditorControl } from '@/atoms';

export function getGraphAttr(graph: Graph, control?: EditorControl) {
  if (
    graph.tool === 'line' ||
    graph.tool === 'pencil' ||
    graph.tool === 'eraser'
  ) {
    const isEraser = graph.tool === 'eraser';
    return {
      points: graph.points,
      tension: graph.tool === 'pencil' || isEraser ? 0.5 : 0,
      lineCap: graph.tool === 'pencil' || isEraser ? 'round' : 'butt',
      lineJoin: graph.tool === 'pencil' || isEraser ? 'round' : 'miter',
      globalCompositeOperation: isEraser ? 'destination-out' : 'source-over',
      stroke: isEraser ? 'white' : graph.color,
      strokeWidth: isEraser
        ? (graph.strokeWidth || control?.strokeWidth || 2) * 2
        : graph.strokeWidth,
    } as Konva.LineConfig;
  } else if (graph.tool === 'rect') {
    return {
      x: graph?.points?.[0],
      y: graph?.points?.[1],
      width: graph?.points?.[2] - graph?.points?.[0],
      height: graph?.points?.[3] - graph?.points?.[1],
      stroke: graph.color,
      strokeWidth: graph.strokeWidth,
    } as Konva.RectConfig;
  } else if (graph.tool === 'ellipse') {
    return {
      x: (graph?.points?.[0] + graph?.points?.[2]) / 2,
      y: (graph?.points?.[1] + graph?.points?.[3]) / 2,
      radiusX: Math.abs((graph?.points?.[2] - graph?.points?.[0]) / 2),
      radiusY: Math.abs((graph?.points?.[3] - graph?.points?.[1]) / 2),
      stroke: graph.color,
      strokeWidth: graph.strokeWidth,
    } as Konva.EllipseConfig;
  } else if (graph.tool === 'text') {
    return {
      x: graph?.points?.[0],
      y: graph?.points?.[1],
      text: graph?.text,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: control?.color ?? '#000000',
    } as Konva.TextConfig;
  }
}
