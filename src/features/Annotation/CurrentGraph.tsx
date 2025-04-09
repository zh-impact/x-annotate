import { Ellipse, Line, Rect } from 'react-konva';
import { useAtomValue } from 'jotai';
import type Konva from 'konva';

import { currentGraphAtom, editorToolAtom } from '@/atoms';

import { getGraphAttr } from './logic';

const toolGraphMap = {
  move: () => null,
  pencil: () => null,
  eraser: () => null,
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
  text: () => null,
};

export default function CurrentGraph() {
  const tool = useAtomValue(editorToolAtom);
  const currentGraph = useAtomValue(currentGraphAtom);

  const graphAttr = getGraphAttr(currentGraph) as Konva.EllipseConfig;
  const RenderTool = toolGraphMap[tool];

  return (
    <RenderTool
      {...graphAttr}
      stroke={currentGraph.color}
      strokeWidth={currentGraph.strokeWidth}
    />
  );
}
