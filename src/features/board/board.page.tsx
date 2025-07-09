import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useNodes } from "./model/nodes";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import { SelectionWindow } from "./ui/selection-window";
import { useViewModel } from "./view-model/use-view-model";
import { useWindowEvents } from "./hooks/use-window-events";
import {
  ActionButton,
  Actions,
  Canvas,
  Dots,
  Layout,
  Overlay,
  Sticker,
} from "./ui";

function BoardPage() {
  const nodesModel = useNodes();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  const viewModel = useViewModel({
    nodesModel,
    canvasRect,
  });

  useWindowEvents(viewModel);

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots />
      <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
        <Overlay
          onClick={viewModel.overlay?.onClick}
          onMouseDown={viewModel.overlay?.onMouseDown}
          onMouseUp={viewModel.overlay?.onMouseUp}
        />
        {viewModel.nodes.map(({ id, x, y, text, isSelected, onClick }) => (
          <Sticker
            key={id}
            text={text}
            x={x}
            y={y}
            selected={isSelected}
            onClick={onClick}
          />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;
