import { Button } from '@xnote/ui/components/button'

import { SolidIcon } from '@/components/solid-icon'

export function EditorTool() {
  return (
    <div className="tool-box flex flex-col items-center">
      <Button variant="outline" size="icon" aria-label="Move">
        <SolidIcon name="move" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Pencil">
        <SolidIcon name="pencil" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Eraser">
        <SolidIcon name="eraser" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Line">
        <SolidIcon name="line" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Ellipse">
        <SolidIcon name="ellipse" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Rectangle">
        <SolidIcon name="rect" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Text">
        <SolidIcon name="text" />
      </Button>
    </div>
  )
}
