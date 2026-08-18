export type ChatWorkerRequest =
    | { type: "load" }
    | { type: "generate"; id: number; question: string };

export type ChatWorkerResponse =
    | { type: "progress"; file: string; loaded: number; total: number }
    | { type: "ready" }
    | { type: "token"; id: number; token: string }
    | { type: "done"; id: number }
    | { type: "error"; id?: number; message: string };
