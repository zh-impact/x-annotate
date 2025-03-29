import type Konva from 'konva';
import { forwardRef, useRef } from 'react';
import { Rect, Line, Ellipse, Transformer, Text } from 'react-konva';
import { useAtom, useAtomValue } from 'jotai';

import { editorToolAtom } from '@/atoms';
import { editorControlAtom } from '@/atoms';
import { type Graph } from '@/atoms';
import { graphStackAtom } from '@/atoms';
import { replaceItemAtIndex } from '../../shared';

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
  const tool = useAtomValue(editorToolAtom);
  const graphStack = useAtomValue(graphStackAtom);

  const graphsRef = useRef<Konva.Node[]>([]);
  const trRef = useRef<Konva.Transformer>(null);

  const handleMouseDown = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === 'move') {
      trRef.current?.nodes([options.currentTarget]);
      trRef.current?.getLayer()?.batchDraw();
      return;
    }
  };

  return (
    <>
      {graphStack.map((graph, index) => {
        return (
          <ForwardedHistoryGraph
            key={index}
            ref={(node: Konva.Node) => (graphsRef.current[index] = node)}
            graph={graph}
            onMouseDown={handleMouseDown}
          />
        );
      })}
      <Transformer ref={trRef} />
    </>
  );
}

const HistoryGraph = (
  {
    graph,
    onMouseDown,
  }: {
    graph: Graph;
    onMouseDown: (options: Konva.KonvaEventObject<MouseEvent>) => void;
  },
  ref: React.Ref<Konva.Node>,
) => {
  const [graphStack, setGraphStack] = useAtom(graphStackAtom);
  const control = useAtomValue(editorControlAtom);
  const index = graphStack.findIndex((g) => g === graph);

  const graphAttr = getGraphAttr(graph, control);
  const Component = toolGraphMap[graph.tool!];
  console.log('Component', Component);
  console.log(graph.tool, graphAttr)
  if (!Component) return null;

  const handleMouseDown = (options: Konva.KonvaEventObject<MouseEvent>) => {
    const newGraphStack = replaceItemAtIndex(graphStack, index, {
      ...graph,
      draggable: true,
    });
    setGraphStack(newGraphStack);

    onMouseDown(options);
  };

  return (
    <Component
      ref={ref}
      {...graphAttr}
      draggable={graph.draggable}
      onMouseDown={handleMouseDown}
    />
  );
};

const ForwardedHistoryGraph = forwardRef(HistoryGraph);
