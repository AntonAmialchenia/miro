import { pointOnScreenToCanvasPoint } from "@/features/board/domain/screen-to-canvas";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import { distanceFromPoint } from "@/features/board/domain/point";
import { goToNodesDragging } from "../nodes-dragging";

export function useGoToNodesDragging(params: ViewModelParams) {
  const { canvasRect, setViewState } = params;
  const handleWindowMouseMove = (idleState: IdleViewState, e: MouseEvent) => {
    if (idleState.mouseDown && idleState.mouseDown.type === "node") {
      const currentPoint = pointOnScreenToCanvasPoint(
        {
          x: e.clientX,
          y: e.clientY,
        },
        canvasRect
      );
      if (distanceFromPoint(idleState.mouseDown, currentPoint) > 5) {
        setViewState(
          goToNodesDragging({
            startPoint: idleState.mouseDown,
            endPoint: currentPoint,
            nodesToMove: new Set([
              ...Array.from(idleState.selectedIds),
              idleState.mouseDown.nodeId,
            ]),
          })
        );
      }
    }
  };

  return { handleWindowMouseMove };
}
