import type Konva from "konva";
import { forwardRef, useRef } from "react";
import { Rect, Line, Ellipse, Transformer, Text } from "react-konva";
import { useRecoilState, useRecoilValue } from "recoil";

import { editorToolState } from "@/store/editorTool";
import { editorControlsState } from "@/store/editorControl";
import { type Graph } from "@/store/graphCurrent";
import { graphStackState } from "@/store/graphStack";
import { replaceItemAtIndex } from "@/shared";

import { getGraphAttr } from "./logic";

const toolGraphMap = {
  move: () => null,
  eraser: () => null,
  line: Line,
  rect: Rect,
  ellipse: Ellipse,
  text: Text,
  pencil: Line,
};

export default function GraphStack() {
  const tool = useRecoilValue(editorToolState);
  const graphStack = useRecoilValue(graphStackState);

  const graphsRef = useRef<Konva.Node[]>([]);
  const trRef = useRef<Konva.Transformer>(null);

  const handleMouseDown = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "move") {
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
  ref: React.Ref<Konva.Node>
) => {
  const [graphStack, setGraphStack] = useRecoilState(graphStackState);
  const control = useRecoilValue(editorControlsState);
  const index = graphStack.findIndex((g) => g === graph);

  const graphAttr = getGraphAttr(graph, control) as Konva.EllipseConfig;
  const Component = toolGraphMap[graph.tool!];
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
      ref={ref as any}
      {...graphAttr}
      stroke={graph.color}
      strokeWidth={graph.strokeWidth}
      draggable={graph.draggable}
      onMouseDown={handleMouseDown}
    />
  );
};

const ForwardedHistoryGraph = forwardRef(HistoryGraph);
