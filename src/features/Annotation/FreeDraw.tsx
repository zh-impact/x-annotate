import { Line } from 'react-konva';
import { useAtomValue } from 'jotai';

import { editorToolAtom } from '@/atoms';
import { currentGraphAtom } from '@/atoms';
import { editorControlAtom } from '@/atoms';

export default function FreeDraw() {
  const tool = useAtomValue(editorToolAtom);
  const currentGraph = useAtomValue(currentGraphAtom);
  const control = useAtomValue(editorControlAtom);

  if (tool !== 'pencil' || !currentGraph.points?.length) return null;

  return (
    <Line
      points={currentGraph.points}
      stroke={control.color}
      strokeWidth={control.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation="source-over"
    />
  );
}
