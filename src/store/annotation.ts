import { atom, selector } from "recoil";

type CanvasState = {
  initialized: boolean;
  width: number;
  height: number;
  fileUrl: string | null;
};

export const annotateCanvasState = atom<CanvasState>({
  key: "AnnotateCanvas",
  default: {
    initialized: false,
    width: 640,
    height: 480,
    fileUrl: null,
  },
});

export const annotationState = selector({
  key: "Annotation",
  get: async ({ get }) => {
    // const file = get(annotateFileState);
    const canvas = get(annotateCanvasState);

    // const fileUrl = file ? URL.createObjectURL(file) : null;

    return {
      ...canvas,
    };
  },
});
