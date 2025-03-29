import { useAtomValue } from 'jotai';

import { currentGraphAtom, editorToolAtom } from '@/atoms';

import GraphStack from './GraphStack';
import FreeDraw from './FreeDraw';
import Eraser from './Eraser';
import CurrentGraph from './CurrentGraph';
// import CurrentText from "./CurrentText";

export function Annotation() {
  const editorTool = useAtomValue(editorToolAtom);
  const currentGraph = useAtomValue(currentGraphAtom);

  return (
    <>
      <GraphStack />

      <FreeDraw />
      <Eraser />

      {editorTool !== 'text' && currentGraph.points?.length === 4 && (
        <CurrentGraph />
      )}

      {/* {editorTool === "text" && <CurrentText />} */}
    </>
  );
}
