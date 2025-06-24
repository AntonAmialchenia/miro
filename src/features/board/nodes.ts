import { useState } from "react";

type NodeBase = {
  id: string;
  type: string;
};
type StickerNode = NodeBase & {
  type: "sticker";
  x: number;
  y: number;
  text: string;
};

type Node = StickerNode;

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "sticker",
      text: "Hello 1",
      x: 100,
      y: 100,
    },
    {
      id: "2",
      type: "sticker",
      text: "Hello 2",
      x: 200,
      y: 200,
    },
  ]);

  const addSticker = (data: { text: string; x: number; y: number }) => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        ...data,
      },
    ]);
  };
  return {
    nodes,
    addSticker,
  };
}
