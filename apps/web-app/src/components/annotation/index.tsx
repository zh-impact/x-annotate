import { useAnnoteStore } from '@/store'

import GraphStack from './GraphStack'
import FreeDraw from './FreeDraw'
import Eraser from './Eraser'
import CurrentGraph from './CurrentGraph'
// import CurrentText from "./CurrentText";

export function Annotation() {
  const editorTool = useAnnoteStore((s) => s.editorTool)
  const currentGraph = useAnnoteStore((s) => s.currentGraph)

  return (
    <>
      <GraphStack />

      <FreeDraw />
      <Eraser />

      {editorTool !== 'text' && currentGraph?.points?.length === 4 && (
        <CurrentGraph />
      )}

      {/* {editorTool === "text" && <CurrentText />} */}
    </>
  )
}
