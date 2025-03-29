import { expect, describe, it } from 'vitest';

import { getGraphAttr } from './logic';

import { type Graph, EditorControl } from '@/atoms';

describe('getGraphAttr', () => {
  describe('line tool', () => {
    it('should return correct line configuration', () => {
      const graph: Graph = {
        tool: 'line',
        points: [0, 0, 100, 100],
        color: '#000000',
        strokeWidth: 2,
      };

      const result = getGraphAttr(graph);

      expect(result).toEqual({
        points: [0, 0, 100, 100],
        tension: 0,
        lineCap: 'butt',
        lineJoin: 'miter',
        globalCompositeOperation: 'source-over',
        stroke: '#000000',
        strokeWidth: 2,
      });
    });
  });

  describe('pencil tool', () => {
    it('should return correct pencil configuration', () => {
      const graph: Graph = {
        tool: 'pencil',
        points: [0, 0, 50, 50, 100, 100],
        color: '#ff0000',
        strokeWidth: 3,
      };

      const result = getGraphAttr(graph);

      expect(result).toEqual({
        points: [0, 0, 50, 50, 100, 100],
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        globalCompositeOperation: 'source-over',
        stroke: '#ff0000',
        strokeWidth: 3,
      });
    });
  });

  describe('eraser tool', () => {
    it('should return correct eraser configuration with control', () => {
      const graph: Graph = {
        tool: 'eraser',
        points: [0, 0, 50, 50],
        strokeWidth: 4,
      };

      const control: EditorControl = {
        strokeWidth: 5,
        color: '#000000',
      };

      const result = getGraphAttr(graph, control);

      expect(result).toEqual({
        points: [0, 0, 50, 50],
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        globalCompositeOperation: 'destination-out',
        stroke: 'white',
        strokeWidth: 8,
      });
    });
  });

  describe('rect tool', () => {
    it('should return correct rectangle configuration', () => {
      const graph: Graph = {
        tool: 'rect',
        points: [10, 20, 110, 120],
        color: '#0000ff',
      };

      const result = getGraphAttr(graph);

      expect(result).toEqual({
        x: 10,
        y: 20,
        width: 100,
        height: 100,
        stroke: '#0000ff',
        strokeWidth: undefined,
      });
    });
  });

  describe('ellipse tool', () => {
    it('should return correct ellipse configuration', () => {
      const graph: Graph = {
        tool: 'ellipse',
        points: [0, 0, 100, 50],
        color: '#00ff00',
      };

      const result = getGraphAttr(graph);

      expect(result).toEqual({
        x: 50,
        y: 25,
        radiusX: 50,
        radiusY: 25,
        stroke: '#00ff00',
        strokeWidth: undefined,
      });
    });
  });

  describe('text tool', () => {
    it('should return correct text configuration', () => {
      const graph: Graph = {
        tool: 'text',
        points: [10, 20],
        text: 'Hello World',
      };

      const control: EditorControl = {
        color: '#ff0000',
        strokeWidth: 2,
      };

      const result = getGraphAttr(graph, control);

      expect(result).toEqual({
        x: 10,
        y: 20,
        text: 'Hello World',
        fontSize: 20,
        fontFamily: 'Arial',
        fill: '#ff0000',
      });
    });
  });
});
