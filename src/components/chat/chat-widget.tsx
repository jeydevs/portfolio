"use client";

import * as React from "react";
import { Bot, LoaderCircle, MessageCircle, BrushCleaning, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ChatWorkerRequest, ChatWorkerResponse } from "@/lib/chat-types";
import {
    GUARDRAIL_REFUSAL,
    looksLikePromptInjection,
    looksLikePromptLeak,
} from "@/lib/chat-guardrails";

type Message = {
    role: "user" | "assistant";
    content: string;
};

type Status = "idle" | "loading" | "ready" | "generating" | "error";

function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-0.5 py-0.5">
            <span className="size-1.5 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-current opacity-60" />
        </div>
    );
}

const WELCOME_MESSAGE: Message = {
    role: "assistant",
    content:
        "¡Hola! Soy JeyBot, el asistente de este portafolio. Pregúntame sobre la experiencia, educación o contacto de Jefferson.",
};

export function ChatWidget() {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState<Status>("idle");
    const [progress, setProgress] = React.useState(0);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const workerRef = React.useRef<Worker | null>(null);
    const filesRef = React.useRef<Map<string, { loaded: number; total: number }>>(
        new Map()
    );
    const nextIdRef = React.useRef(0);
    const currentIdRef = React.useRef<number | null>(null);
    const pendingContentRef = React.useRef("");
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [messages, open]);

    React.useEffect(() => {
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    function getWorker() {
        if (!workerRef.current) {
            const worker = new Worker(new URL("@/lib/chat-worker.ts", import.meta.url), {
                type: "module",
            });
            worker.onmessage = (event: MessageEvent<ChatWorkerResponse>) =>
                handleWorkerMessage(event.data);
            workerRef.current = worker;
        }
        return workerRef.current;
    }

    function send(worker: Worker, message: ChatWorkerRequest) {
        worker.postMessage(message);
    }

    function handleWorkerMessage(msg: ChatWorkerResponse) {
        switch (msg.type) {
            case "progress": {
                filesRef.current.set(msg.file, { loaded: msg.loaded, total: msg.total });
                let loaded = 0;
                let total = 0;
                for (const f of filesRef.current.values()) {
                    loaded += f.loaded;
                    total += f.total;
                }
                setProgress(total > 0 ? Math.round((loaded / total) * 100) : 0);
                break;
            }
            case "ready": {
                setStatus("ready");
                setMessages([WELCOME_MESSAGE]);
                break;
            }
            case "token": {
                if (msg.id !== currentIdRef.current) break;
                pendingContentRef.current += msg.token;
                setMessages((prev) => {
                    const next = [...prev];
                    const last = next[next.length - 1];
                    if (last && last.role === "assistant") {
                        next[next.length - 1] = { ...last, content: last.content + msg.token };
                    }
                    return next;
                });
                break;
            }
            case "done": {
                if (msg.id !== currentIdRef.current) break;
                if (looksLikePromptLeak(pendingContentRef.current)) {
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];
                        if (last && last.role === "assistant") {
                            next[next.length - 1] = { ...last, content: GUARDRAIL_REFUSAL };
                        }
                        return next;
                    });
                }
                setStatus("ready");
                break;
            }
            case "error": {
                if (msg.id !== undefined) {
                    // Error while generating a reply: don't blow up the whole chat,
                    // just surface it as a message and let the user keep chatting.
                    if (msg.id !== currentIdRef.current) break;
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];
                        if (last && last.role === "assistant") {
                            next[next.length - 1] = {
                                ...last,
                                content: "Estimado, ocurrió un error al generar la respuesta. Por favor, intenta de nuevo.",
                            };
                        }
                        return next;
                    });
                    setStatus("ready");
                } else {
                    setError(msg.message);
                    setStatus("error");
                }
                break;
            }
        }
    }

    function handleLoadModel() {
        setStatus("loading");
        setError(null);
        const worker = getWorker();
        send(worker, { type: "load" });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const question = input.trim();
        if (!question || status !== "ready") return;

        if (looksLikePromptInjection(question)) {
            setMessages((prev) => [
                ...prev,
                { role: "user", content: question },
                { role: "assistant", content: GUARDRAIL_REFUSAL },
            ]);
            setInput("");
            return;
        }

        const id = nextIdRef.current++;
        currentIdRef.current = id;
        pendingContentRef.current = "";
        setMessages((prev) => [
            ...prev,
            { role: "user", content: question },
            { role: "assistant", content: "" },
        ]);
        setInput("");
        setStatus("generating");
        send(getWorker(), { type: "generate", id, question });
    }

    function handleReset() {
        currentIdRef.current = null;
        setMessages([WELCOME_MESSAGE]);
        setInput("");
        setError(null);
        setStatus("ready");
    }

    return (
        <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
            {open && (
                <div className="flex h-112 w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <div className="flex items-center gap-2">
                            <Bot className="size-4" />
                            <span className="text-sm font-semibold">Asistente del portafolio</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {(status === "ready" || status === "generating") && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    aria-label="Reiniciar conversación"
                                    title="Reiniciar conversación"
                                    className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <BrushCleaning className="size-4" />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Cerrar chat"
                                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    </div>

                    {status === "idle" && (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                            <div className="flex flex-row items-center gap-2">
                                <Bot className="size-8 text-muted-foreground" />
                                <p className="text-xl font-medium">JeyBot</p>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Pregúntale sobre la experiencia, educación, habilidades o contacto. Corre 100% local, así que tu conversación
                                nunca sale de tu equipo.
                            </p>
                            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                                La primera vez descarga un modelo de IA de hasta ~800 MB. Puede tardar unos minutos y consumir datos: se recomienda usar wifi. Luego queda guardado en tu navegador.
                            </p>
                            <button
                                type="button"
                                onClick={handleLoadModel}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
                            >
                                Iniciar conversación
                            </button>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                            <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
                            <p className="text-sm font-medium">
                                {progress > 0 ? "Preparando tu asistente…" : "Iniciando…"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Esto solo ocurre una vez. La próxima vez estará listo al instante.
                            </p>
                            <div className="h-1.5 w-full max-w-48 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs tabular-nums text-muted-foreground">{progress}%</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                            <p className="text-sm text-destructive">
                                No se pudo cargar el asistente. {error}
                            </p>
                            <button
                                type="button"
                                onClick={handleLoadModel}
                                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {(status === "ready" || status === "generating") && (
                        <>
                            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                                {messages.map((message, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                                            message.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                        )}
                                    >
                                        {message.content || <TypingIndicator />}
                                    </div>
                                ))}
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center gap-2 border-t border-border p-3"
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Pregunta algo sobre Jefferson…"
                                    disabled={status === "generating"}
                                    className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "generating" || !input.trim()}
                                    aria-label="Enviar"
                                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
                                >
                                    <Send className="size-4" />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Cerrar chat" : "Abrir chat"}
                className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
                {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
            </button>
        </div>
    );
}
