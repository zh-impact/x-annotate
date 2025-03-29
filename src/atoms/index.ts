import { atom } from 'jotai';

// Editor Control

export type EditorControl = {
  color: string;
  strokeWidth: number;
};

export const editorControlAtom = atom<EditorControl>({
  color: '#a855f7',
  strokeWidth: 2,
});

// Editor Tool

export type EditorTool =
  | 'move'
  | 'pencil'
  | 'eraser'
  | 'line'
  | 'ellipse'
  | 'rect'
  | 'text';

export const editorTools: EditorTool[] = [
  'move',
  'pencil',
  'eraser',
  'line',
  'ellipse',
  'rect',
  'text',
];

export const editorToolAtom = atom<EditorTool>('line');

// Annotation Canvas

type AnnoCanvas = {
  initialized: boolean;
  width: number;
  height: number;
  fileUrl: string | null;
};

export const annotationCanvasAtom = atom<AnnoCanvas>({
  initialized: false,
  width: 640,
  height: 480,
  fileUrl: null,
});

// Graph

type Point = [number, number];
export type Points = Point[];

export type PointPair = number[];

export type Graph = {
  tool?: EditorTool;
  points: PointPair;
  color?: string;
  strokeWidth?: number;
  draggable?: boolean;
  text?: string;
};

export const currentGraphAtom = atom<Graph>({
  tool: undefined,
  points: [],
  draggable: false,
});

export const graphStackAtom = atom<Graph[]>([]);
