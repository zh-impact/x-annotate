import { createFileRoute } from '@tanstack/react-router'

import { EditorControl } from '@/components/editor-control'
import { EditorTool } from '@/components/editor-tool'

export const Route = createFileRoute('/annotate')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2">
      <div className="h-screen">
        <div className="grid grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] h-full">
          <div className="topbar col-span-2 flex gap-4 items-center bg-slate-300">
            <i className="text-2xl text-purple-500 font-bold pl-4">X-Annotation</i>
            <EditorControl />
          </div>

          <div className="sidebar bg-slate-100 py-4">
            <EditorTool />
          </div>

          <div className="content flex-grow bg-slate-200"></div>
        </div>
      </div>
    </div>
  )
}
