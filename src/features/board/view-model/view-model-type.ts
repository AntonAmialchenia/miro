type ViewModeNode = {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ViewModel = {
  nodes: ViewModeNode[];
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
  };
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive?: boolean;
    };
  };
};
