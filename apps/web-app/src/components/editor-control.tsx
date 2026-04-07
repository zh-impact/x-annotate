import { Slider } from '@xnote/ui/components/slider'
import { Button } from '@xnote/ui/components/button'

import { SolidIcon } from '@/components/solid-icon'

export function EditorControl() {
  return (
    <>
      <Slider defaultValue={[2]} max={32} step={1} className="mx-auto w-full max-w-xs" />

      <Button variant="outline" size="icon" aria-label="Undo">
        <SolidIcon name="undo" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Redo">
        <SolidIcon name="redo" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Delete">
        <SolidIcon name="delete" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Download">
        <SolidIcon name="download" />
      </Button>
    </>
  )
}
