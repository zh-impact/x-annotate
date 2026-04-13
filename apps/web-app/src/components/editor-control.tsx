import { Button } from '@xnote/ui/components/button'
import { Slider } from '@xnote/ui/components/slider'

import { SolidIcon } from '@/components/solid-icon'
import { useAnnoteStore } from '@/store'

export function EditorControl() {
  const control = useAnnoteStore((s) => s.editorControl)
  const canUndo = useAnnoteStore((s) => Boolean(s.currentGraph) || s.history.past.length > 0)
  const canRedo = useAnnoteStore((s) => s.history.future.length > 0)
  const setControl = useAnnoteStore((s) => s.setEditorControl)
  const undo = useAnnoteStore((s) => s.undo)
  const redo = useAnnoteStore((s) => s.redo)

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

      <Button variant="outline" size="icon" aria-label="Undo" onClick={undo} disabled={!canUndo}>
        <SolidIcon name="undo" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Redo" onClick={redo} disabled={!canRedo}>
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
