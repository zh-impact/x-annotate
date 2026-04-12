import {
  CircleIcon,
  CursorTextIcon,
  Delete01Icon,
  Download01Icon,
  EraserIcon,
  LinerIcon,
  MoveIcon,
  PencilEditIcon,
  RectangularIcon,
  RedoIcon,
  UndoIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'

const iconMap: Record<string, typeof UndoIcon> = {
  undo: UndoIcon,
  redo: RedoIcon,
  delete: Delete01Icon,
  download: Download01Icon,
  // Editor Tool
  move: MoveIcon,
  pencil: PencilEditIcon,
  eraser: EraserIcon,
  line: LinerIcon,
  ellipse: CircleIcon,
  rect: RectangularIcon,
  text: CursorTextIcon,
}

interface SolidIconProps extends Omit<ComponentProps<typeof HugeiconsIcon>, 'icon'> {
  name: keyof typeof iconMap
}

export function SolidIcon({ name, ...props }: SolidIconProps) {
  const icon = iconMap[name]
  if (!icon) {
    console.warn(`Icon "${name}" not found in icon map`)
    return null
  }
  return <HugeiconsIcon icon={icon} {...props} />
}
