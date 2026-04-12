import { Button } from '@xnote/ui/components/button'

import { SolidIcon } from '@/components/solid-icon'
import { type EditorTool as TEditorTool, useAnnoteStore } from '@/store'

const tools: TEditorTool[] = ['move', 'pencil', 'eraser', 'line', 'ellipse', 'rect', 'text']

export function EditorTool() {
  const tool = useAnnoteStore((s) => s.editorTool)
  const setTool = useAnnoteStore((s) => s.setEditorTool)

  return (
    <div className="tool-box flex flex-col items-center">
      {tools.map((t) => (
        <Button
          key={t}
          variant={tool === t ? 'default' : 'outline'}
          size="icon"
          aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
          onClick={() => setTool(t)}
        >
          <SolidIcon name={t} />
        </Button>
      ))}
    </div>
  )
}
