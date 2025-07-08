import type { ViewModelParams } from "../view-model-params";
import type { ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type AddStickerViewState = {
  type: "add-sticker";
};

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle());
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
        setViewState(goToIdle());
      },
    },
    actions: {
      addSticker: {
        onClick: () => setViewState(goToIdle()),
        isActive: true,
      },
    },
  });
}

export function goToAddSticker(): AddStickerViewState {
  return { type: "add-sticker" };
}
