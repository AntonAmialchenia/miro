import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useNodes } from "./model/nodes";
import { useViewState } from "./model/view-state";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import {
  ActionButton,
  Actions,
  Canvas,
  Dots,
  Layout,
  Overlay,
  Sticker,
} from "./ui";
import { useViewModel } from "./view-model/use-view-model";

function BoardPage() {
  const nodesModel = useNodes();
  const viewStateModel = useViewState();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  const viewModel = useViewModel({
    nodesModel,
    viewStateModel,
    canvasRect,
  });

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
