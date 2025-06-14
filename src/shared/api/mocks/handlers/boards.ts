import { delay, HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { verifyTokenOrThrow } from "../session";

const boards: ApiSchemas["Board"][] = [
  {
    id: "board-1",
    name: "Marketing Campaign",
  },
  {
    id: "board-2",
    name: "Product Roadmap",
  },
];

export const boardsHandlers = [
  http.get("/boards", async ({ request }) => {
    await delay(500);
    await verifyTokenOrThrow(request);
    return HttpResponse.json(boards);
  }),
  http.post("/boards", async ({ request }) => {
    await verifyTokenOrThrow(request);
    const body = await request.json();
    const board = {
      id: crypto.randomUUID(),
      name: body.name,
    };
    boards.push(board);
    await delay(500);
    return HttpResponse.json(board);
  }),
  http.delete("/boards/{boardId}", async ({ request, params }) => {
    await verifyTokenOrThrow(request);
    const boardId = params.boardId;
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }
    boards.splice(boardIndex, 1);
    return HttpResponse.json({ message: "Board deleted", code: "OK" });
  }),
];
