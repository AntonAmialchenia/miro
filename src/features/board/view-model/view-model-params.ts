import type { NodesModel } from "../model/nodes";
import type { ViewStateResult } from "../model/view-state";
import type { CanvasRect } from "../hooks/use-canvas-rect";

export type ViewModelParams = {
  nodesModel: NodesModel;
  viewStateModel: ViewStateResult;
  canvasRect: CanvasRect | undefined;
};
