import { Line } from "react-konva";
import { useRecoilValue } from "recoil";

import { editorToolState } from "@/store/editorTool";
import { activeGraphState } from "@/store/graphCurrent";
import { editorControlsState } from "@/store/editorControl";

export default function FreeDraw() {
  const tool = useRecoilValue(editorToolState);
  const activeGraph = useRecoilValue(activeGraphState);
  const control = useRecoilValue(editorControlsState);

  if (tool !== "pencil" || !activeGraph.points?.length) return null;

  return (
    <Line
      points={activeGraph.points}
      stroke={control.color}
      strokeWidth={control.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation="source-over"
    />
  );
}
