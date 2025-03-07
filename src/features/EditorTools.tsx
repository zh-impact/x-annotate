import {
  IconPencil,
  IconCursorText,
  IconEraser,
  IconSquare,
  IconCircle,
  IconLine,
  IconArrowsMove,
} from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { useRecoilState } from "recoil";

import { editorToolState, tools } from "@/store/editorTool";

const iconNameMap = {
  move: IconArrowsMove,
  pencil: IconPencil,
  eraser: IconEraser,
  line: IconLine,
  ellipse: IconCircle,
  rect: IconSquare,
  text: IconCursorText,
};

export default function ToolBox() {
  const [tool, setTool] = useRecoilState(editorToolState);

  return (
    <div className="tool-box flex flex-col items-center">
      {tools.map((t) => {
        const Icon = iconNameMap[t];
        return (
          <div
            className={`w-full aspect-square flex items-center justify-center ${tool === t ? "bg-blue-100" : ""
              }`}
          >
            <Tooltip key={t} label={t.charAt(0).toUpperCase() + t.slice(1)}>
              <button
                key={t}
                className={`w-full aspect-square flex items-center justify-center ${tool === t ? "text-blue-500" : ""}`}
                onClick={() => setTool(t)}
              >
                <Icon />
              </button>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}
