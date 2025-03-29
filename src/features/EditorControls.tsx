import { useAtom } from 'jotai';
import { ActionIcon, ColorInput, rem, Slider, Tooltip } from '@mantine/core';
import {
  IconArrowBackUp,
  IconFocus2,
  IconTrash,
  IconDownload,
} from '@tabler/icons-react';

import { COLOR_SWATCHES } from '@/constants';
import { editorControlAtom } from '@/atoms';

export function EditorControls() {
  const [controls, setControls] = useAtom(editorControlAtom);

  return (
    <>
      <ColorInput
        className="w-28"
        size="xs"
        value={controls.color}
        onChange={(value) => setControls((prev) => ({ ...prev, color: value }))}
        eyeDropperIcon={
          <IconFocus2
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        swatches={COLOR_SWATCHES}
      />
      <Slider
        className="w-40"
        value={controls.strokeWidth}
        onChange={(value) =>
          setControls((prev) => ({ ...prev, strokeWidth: value }))
        }
        min={1}
        max={32}
      />
      <span className="text-sm w-10">{controls.strokeWidth}px</span>

      <Tooltip label="Undo">
        <ActionIcon disabled>
          <IconArrowBackUp />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Clear">
        <ActionIcon disabled>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Save">
        <ActionIcon>
          <IconDownload />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
