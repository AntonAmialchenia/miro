import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useNodes } from "./nodes";
import { useBoardViewState } from "./view-state";
import { useCanvasRect } from "./use-canvas-rect";
import { useLayoutFocus } from "./use-layout-focus";
import { ActionButton, Actions, Canvas, Dots, Layout, Sticker } from "./ui";

function BoardPage() {
  const { nodes, addSticker } = useNodes();
  const { viewState, goToAddSticker, goToIdle } = useBoardViewState();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();
  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={(e) => {
        if (viewState.type === "add-sticker") {
          if (e.key === "Escape") {
            goToIdle();
          }
        }
        if (viewState.type === "idle") {
          if (e.key === "s") {
            goToAddSticker();
          }
        }
      }}
    >
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
              text: "Новый стикер",
            });
            goToIdle();
          }
        }}
      >
        {nodes.map(({ id, x, y, text }) => (
          <Sticker key={id} text={text} x={x} y={y} />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewState.type === "add-sticker"}
          onClick={() => {
            if (viewState.type === "add-sticker") {
              goToIdle();
            } else {
              goToAddSticker();
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
