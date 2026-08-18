import { pipeline, TextStreamer, type TextGenerationPipeline } from "@huggingface/transformers";

import { SITE_CONTEXT } from "./site-context";
import type { ChatWorkerRequest, ChatWorkerResponse } from "./chat-types";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

let generatorPromise: Promise<TextGenerationPipeline> | null = null;

function post(message: ChatWorkerResponse) {
    self.postMessage(message);
}

function loadPipeline(device: "webgpu" | "wasm", dtype: "q4f16" | "q4") {
    return pipeline("text-generation", MODEL_ID, {
        device,
        dtype,
        progress_callback: (progress) => {
            if (progress.status === "progress") {
                post({
                    type: "progress",
                    file: progress.file,
                    loaded: progress.loaded,
                    total: progress.total,
                });
            }
        },
    });
}

function loadGenerator() {
    if (!generatorPromise) {
        const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;

        generatorPromise = (async () => {
            if (hasWebGPU) {
                try {
                    return await loadPipeline("webgpu", "q4f16");
                } catch (err) {
                    // navigator.gpu can exist without a usable adapter (blocklisted driver,
                    // no hardware, etc.), which only fails once we actually try to init.
                    // Fall back to the CPU backend instead of hard-failing the whole chat.
                    console.warn("WebGPU init failed, falling back to wasm:", err);
                }
            }
            return loadPipeline("wasm", "q4");
        })();
    }
    return generatorPromise;
}

self.onmessage = async (event: MessageEvent<ChatWorkerRequest>) => {
    const msg = event.data;

    if (msg.type === "load") {
        try {
            await loadGenerator();
            post({ type: "ready" });
        } catch (err) {
            generatorPromise = null;
            post({ type: "error", message: err instanceof Error ? err.message : String(err) });
        }
        return;
    }

    if (msg.type === "generate") {
        try {
            const generator = await loadGenerator();

            const streamer = new TextStreamer(generator.tokenizer, {
                skip_prompt: true,
                skip_special_tokens: true,
                callback_function: (token: string) => {
                    post({ type: "token", id: msg.id, token });
                },
            });

            await generator(
                [
                    { role: "system", content: SITE_CONTEXT },
                    { role: "user", content: msg.question },
                ],
                {
                    max_new_tokens: 200,
                    do_sample: false,
                    repetition_penalty: 1.3,
                    no_repeat_ngram_size: 3,
                    streamer,
                }
            );

            post({ type: "done", id: msg.id });
        } catch (err) {
            post({
                type: "error",
                id: msg.id,
                message: err instanceof Error ? err.message : String(err),
            });
        }
    }
};
