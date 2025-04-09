import React from 'react';
import { Ellipse, Line, Rect, Text } from 'react-konva';
import { useAtomValue } from 'jotai';

import { editorControlAtom, graphStackAtom } from '@/atoms';

import { getGraphAttr } from './logic';

const toolGraphMap = {
  move: () => null,
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
  text: Text,
  pencil: Line,
  eraser: Line,
};

export default function GraphStack() {
  const control = useAtomValue(editorControlAtom);
  const graphStack = useAtomValue(graphStackAtom);

  return (
    <>
      {graphStack.map((graph, index) => {
        const graphAttr = getGraphAttr(graph, control);
        const Component = toolGraphMap[graph.tool!];
        if (!Component) return null;
        return (
          <React.Fragment key={index}>
            <Component {...graphAttr} />
          </React.Fragment>
        );
      })}
    </>
  );
}
