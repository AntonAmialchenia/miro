import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import { goToEditSticker } from "../edit-sticker";

export function useGoToEditSticker(params: ViewModelParams) {
  const { setViewState } = params;
  const handleNodeClick = (
    idleState: IdleViewState,
    nodeId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (
      idleState.selectedIds.size === 1 &&
      idleState.selectedIds.has(nodeId) &&
      !e.shiftKey &&
      !e.ctrlKey
    ) {
      setViewState(goToEditSticker(nodeId));
      return { preventNext: true };
    }

    return { preventNext: false };
  };

  const handleKeyDown = (
    idleState: IdleViewState,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      e.altKey &&
      idleState.selectedIds.size === 1
    ) {
      const [id] = idleState.selectedIds.values();
      setViewState(goToEditSticker(id));
      return { preventNext: true };
    }
    return { preventNext: false };
  };

  return { handleNodeClick, handleKeyDown };
}
