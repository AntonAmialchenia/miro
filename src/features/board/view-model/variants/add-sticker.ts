import type { ViewModelParams } from "../view-model-params";
import type { ViewModel } from "../view-model-type";

export function useAddStickerViewModel({
  nodesModel,
  viewStateModel,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          viewStateModel.goToIdle();
        }
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) return;
        nodesModel.addSticker({
          x: e.clientX - canvasRect.x,
          y: e.clientY - canvasRect.y,
          text: "Новый стикер",
        });
        viewStateModel.goToIdle();
      },
    },
    actions: {
      addSticker: {
        onClick: () => {
          viewStateModel.goToIdle();
        },
        isActive: true,
      },
    },
  });
}
