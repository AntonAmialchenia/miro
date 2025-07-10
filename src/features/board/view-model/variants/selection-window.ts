import type { Point } from "../../domain/point";
import {
  createFromPoints,
  createRectFromDimensions,
  isPointInRect,
  isRectsIntersecting,
  type Rect,
} from "../../domain/rect";
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
  nodesDimensions,
}: ViewModelParams) {
  const getNodes = (state: SelectionWindowViewState, selectionRect: Rect) => {
    return nodesModel.nodes.map((node) => {
      const nodeDimensions = nodesDimensions[node.id];

      const nodeRect = createRectFromDimensions(node, nodeDimensions);

      return {
        ...node,
        isSelected:
          isRectsIntersecting(nodeRect, selectionRect) ||
          state.initialSelectedIds.has(node.id),
      };
    });
  };

  return (state: SelectionWindowViewState) => {
    const rect = createFromPoints(state.startPoint, state.endPoint);
    const nodes = getNodes(state, rect);

    return {
      nodes,
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
          const nodesIdsInRect = nodes
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
