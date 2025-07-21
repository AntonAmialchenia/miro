import { pointOnScreenToCanvasPoint } from "@/features/board/domain/screen-to-canvas";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useMouseDown({ setViewState, canvasRect }: ViewModelParams) {
  const handleOverlayMouseDown = (
    idleState: IdleViewState,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!canvasRect) return;
    setViewState({
      ...idleState,
      mouseDown: pointOnScreenToCanvasPoint(
        {
          x: e.clientX,
          y: e.clientY,
        },
        canvasRect
      ),
    });
  };

  const handleWindowMouseUp = (idleState: IdleViewState) => {
    if (idleState.mouseDown) {
      setViewState({
        ...idleState,
        mouseDown: undefined,
      });
    }
  };

  return { handleOverlayMouseDown, handleWindowMouseUp };
}
