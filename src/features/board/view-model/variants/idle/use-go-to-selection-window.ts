import { distanceFromPoint } from "@/features/board/domain/point";
import { pointOnScreenToCanvasPoint } from "@/features/board/domain/screen-to-canvas";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import { goToSelectionWindow } from "../selection-window";

export function useGoToSelectionWindow({
  canvasRect,
  setViewState,
}: ViewModelParams) {
  const handleWindowMouseMove = (idleState: IdleViewState, e: MouseEvent) => {
    if (idleState.mouseDown) {
      const currentPoint = pointOnScreenToCanvasPoint(
        {
          x: e.clientX,
          y: e.clientY,
        },
        canvasRect
      );
      if (distanceFromPoint(idleState.mouseDown, currentPoint) > 5) {
        setViewState(
          goToSelectionWindow({
            startPoint: idleState.mouseDown,
            endPoint: currentPoint,
            initialSelectedIds: e.shiftKey ? idleState.selectedIds : undefined,
          })
        );
      }
    }
  };

  return { handleWindowMouseMove };
}
