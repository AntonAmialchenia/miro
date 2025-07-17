import type { Rect } from "../domain/rect";

type ViewModeNode = {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTextChange?: (text: string) => void;
};

export type ViewModel = {
  nodes: ViewModeNode[];
  selectionWindow?: Rect;
  layout?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
  canvas?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  overlay?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  window?: {
    onMouseMove?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
  };
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive?: boolean;
    };
  };
};
