import {
  selectItems,
  type SelectionModifier,
} from "@/features/board/domain/selection";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import type React from "react";

export const useSelection = ({ setViewState }: ViewModelParams) => {
  const select = (
    lastState: IdleViewState,
    ids: string[],
    modif: SelectionModifier
  ) => {
    setViewState({
      ...lastState,
      selectedIds: selectItems(lastState.selectedIds, ids, modif),
    });
  };

  const isSelected = (nodeId: string, idleState: IdleViewState) => {
    return idleState.selectedIds.has(nodeId);
  };

  const handleNodeClick = (
    nodeId: string,
    idleState: IdleViewState,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.ctrlKey || e.shiftKey) {
      select(idleState, [nodeId], "toggle");
    } else {
      select(idleState, [nodeId], "replace");
    }
  };

  const handleOverlayMouseUp = (idleState: IdleViewState) => {
    if (!idleState.mouseDown) {
      setViewState({
        ...idleState,
        mouseDown: undefined,
        selectedIds: selectItems(idleState.selectedIds, [], "replace"),
      });
    }
  };

  return {
    handleNodeClick,
    handleOverlayMouseUp,
    isSelected,
  };
};
