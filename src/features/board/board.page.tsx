import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useNodes } from "./nodes";
import { useViewModel } from "./view-model";
import { useCanvasRect } from "./use-canvas-rect";
import { useLayoutFocus } from "./use-layout-focus";
import { ActionButton, Actions, Canvas, Dots, Layout, Sticker } from "./ui";

function BoardPage() {
  const { nodes, addSticker } = useNodes();
  const viewModel = useViewModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();
  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={(e) => {
        if (viewModel.viewState.type === "add-sticker") {
          if (e.key === "Escape") {
            viewModel.goToIdle();
          }
        }
        if (viewModel.viewState.type === "idle") {
          if (e.key === "s") {
            viewModel.goToAddSticker();
          }
        }
      }}
    >
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewModel.viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
              text: "Новый стикер",
            });
            viewModel.goToIdle();
          }
        }}
      >
        {nodes.map(({ id, x, y, text }) => (
          <Sticker
            key={id}
            text={text}
            x={x}
            y={y}
            selected={
              viewModel.viewState.type === "idle" &&
              viewModel.viewState.selectedIds.has(id)
            }
            onClick={(e) => {
              if (viewModel.viewState.type === "idle") {
                if (e.ctrlKey || e.shiftKey) {
                  viewModel.selection([id], "toggle");
                } else {
                  viewModel.selection([id], "replace");
                }
              }
            }}
          />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewModel.viewState.type === "add-sticker"}
          onClick={() => {
            if (viewModel.viewState.type === "add-sticker") {
              viewModel.goToIdle();
            } else {
              viewModel.goToAddSticker();
            }
          }}
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
