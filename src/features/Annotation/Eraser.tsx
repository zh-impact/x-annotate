import { Line } from 'react-konva';
import { useAtomValue } from 'jotai';

import { editorToolAtom, currentGraphAtom, editorControlAtom } from '@/atoms';
import { getGraphAttr } from './logic';

export default function Eraser() {
  const tool = useAtomValue(editorToolAtom);
  const currentGraph = useAtomValue(currentGraphAtom);
  const control = useAtomValue(editorControlAtom);

  if (tool !== 'eraser' || !currentGraph.points?.length) return null;

  const graphAttr = getGraphAttr(currentGraph, control);

  return <Line {...graphAttr} />;
}
