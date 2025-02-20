import { Line } from "react-konva";
import { useRecoilValue } from "recoil";

import { editorToolState } from "@/store/editorTool";
import { activeGraphState } from "@/store/graphCurrent";
import { editorControlsState } from "@/store/editorControl";
import { getGraphAttr } from "./logic";

export default function Eraser() {
  const tool = useRecoilValue(editorToolState);
  const activeGraph = useRecoilValue(activeGraphState);
  const control = useRecoilValue(editorControlsState);

  if (tool !== "eraser" || !activeGraph.points?.length) return null;

  const graphAttr = getGraphAttr(activeGraph, control);

  return <Line {...graphAttr} />;
}
