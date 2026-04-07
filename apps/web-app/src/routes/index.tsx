import { createFileRoute } from '@tanstack/react-router'

import { App } from '@/features/StartEntry'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <App />
    </div>
  )
}
