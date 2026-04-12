import { Button } from '@xnote/ui/components/button'
import { Slider } from '@xnote/ui/components/slider'

import { SolidIcon } from '@/components/solid-icon'
import { useAnnoteStore } from '@/store'

export function EditorControl() {
  const control = useAnnoteStore((s) => s.editorControl)
  const setControl = useAnnoteStore((s) => s.setEditorControl)

  return (
    <>
      <Slider
        value={[control.strokeWidth]}
        onValueChange={(value) => setControl({ strokeWidth: value[0] })}
        defaultValue={[2]}
        max={32}
        step={1}
        className="mx-auto w-full max-w-xs"
      />
      <span className="text-sm w-10">{control.strokeWidth}px</span>

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
