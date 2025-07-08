import type { Point } from "../../domain/point";
import { createFromPoints, isPointInRect } from "../../domain/rect";
import { pointOnScreenToCanvasPoint } from "../../domain/screen-to-canvas";
import type { ViewModelParams } from "../view-model-params";
import { goToIdle } from "./idle";
import { selectItems } from "./../../domain/selection";

export type SelectionWindowViewState = {
  type: "selection-window";
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds: Set<string>;
};

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  return (state: SelectionWindowViewState) => {
    const rect = createFromPoints(state.startPoint, state.endPoint);
    return {
      nodes: nodesModel.nodes.map((node) => ({
        ...node,
        isSelected:
          isPointInRect(node, rect) || state.initialSelectedIds.has(node.id),
      })),
      selectionWindow: rect,

      window: {
        onMouseMove: (e: MouseEvent) => {
          const currentPoint = pointOnScreenToCanvasPoint(
            {
              x: e.clientX,
              y: e.clientY,
            },
            canvasRect
          );
          setViewState({ ...state, endPoint: currentPoint });
        },
        onMouseUp: () => {
          const nodesIdsInRect = nodesModel.nodes
            .filter((node) => isPointInRect(node, rect))
            .map((node) => node.id);
          setViewState(
            goToIdle({
              selectedIds: selectItems(
                state.initialSelectedIds,
                nodesIdsInRect,
                "add"
              ),
            })
          );
        },
      },
    };
  };
}

export function goToSelectionWindow({
  endPoint,
  startPoint,
  initialSelectedIds,
}: {
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds?: Set<string>;
}): SelectionWindowViewState {
  return {
    type: "selection-window",
    startPoint,
    endPoint,
    initialSelectedIds: initialSelectedIds ?? new Set(),
  };
}
