import { createFileRoute } from '@tanstack/react-router';

import { StartEntry } from '@/features/StartEntry';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen">
      <StartEntry />
    </div>
  );
}
