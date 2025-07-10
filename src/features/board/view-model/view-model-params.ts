import type { NodesModel } from "../model/nodes";
import type { CanvasRect } from "../hooks/use-canvas-rect";
import type { Dispatch, SetStateAction } from "react";
import type { ViewState } from "./use-view-model";
import type { NodesDimensionsMap } from "../hooks/use-nodes-dimensions";

export type ViewModelParams = {
  nodesModel: NodesModel;
  setViewState: Dispatch<SetStateAction<ViewState>>;
  canvasRect: CanvasRect | undefined;
  nodesDimensions: NodesDimensionsMap;
};
