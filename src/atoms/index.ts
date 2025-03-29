import { atom } from 'jotai';

// Editor Control

export const editorControl = atom({ color: '#a855f7', strokeWidth: 2 });

// Tool Type

export type ToolType =
  | 'move'
  | 'pencil'
  | 'eraser'
  | 'line'
  | 'ellipse'
  | 'rect'
  | 'text';

export const tools: ToolType[] = [
  'move',
  'pencil',
  'eraser',
  'line',
  'ellipse',
  'rect',
  'text',
];

export const editorToolState = atom<ToolType>('line');

// Canvas

type CanvasState = {
  initialized: boolean;
  width: number;
  height: number;
  fileUrl: string | null;
};

export const annotateCanvasState = atom<CanvasState>({
  initialized: false,
  width: 640,
  height: 480,
  fileUrl: null,
});

// Graph

export type PointPair = number[];

export type Graph = {
  tool?: ToolType;
  points: PointPair;
  color?: string;
  strokeWidth?: number;
  draggable?: boolean;
  text?: string;
};

export const activeGraphState = atom<Graph>({
  tool: undefined,
  points: [],
  draggable: false,
});

export const graphStackState = atom<Graph[]>([]);
