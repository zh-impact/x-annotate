import { createFileRoute } from '@tanstack/react-router'

import { StartEntry } from '@/components/start-entry'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <StartEntry />
    </div>
  )
}
