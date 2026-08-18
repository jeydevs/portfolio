// Lightweight, client-side guardrails for the portfolio chat widget.
// The model runs fully in the browser with no server-side secrets to protect,
// so these checks exist to keep the assistant on-topic and stop it from being
// steered into a different persona or dumping its system prompt verbatim.

const INJECTION_PATTERNS: RegExp[] = [
    /ignora(?:r)?\s+(?:todas?\s+)?(?:las\s+)?instrucciones/i,
    /olvida(?:r)?\s+(?:todo\s+)?lo\s+anterior/i,
    /ignore\s+(?:all\s+|previous\s+|above\s+)*instructions/i,
    /disregard\s+(?:all\s+|previous\s+|above\s+)*instructions/i,
    /(?:cu[aá]les?\s+son|mu[eé]strame|repite|revela|dime)\s+.*(?:instrucciones|prompt)/i,
    /system\s*prompt/i,
    /\bmensaje\s+de\s+sistema\b/i,
    /you\s+are\s+now\b/i,
    /a\s+partir\s+de\s+ahora\s+(?:eres|act[uú]a)/i,
    /modo\s+desarrollador/i,
    /developer\s+mode/i,
    /\bDAN\b/,
    /jailbreak/i,
    /finge\s+(?:que\s+)?no\s+tienes\s+(?:reglas|restricciones)/i,
    /pretend\s+you\s+have\s+no\s+(?:rules|restrictions)/i,
];

/** Detects common prompt-injection attempts in the raw user input. */
export function looksLikePromptInjection(text: string): boolean {
    return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

const LEAK_MARKERS = [
    "## instrucciones",
    "## información",
    "idioma: español",
    "site_context",
    "tu nombre es jeybot",
];

/** Detects whether a generated reply leaked the system prompt back to the user. */
export function looksLikePromptLeak(text: string): boolean {
    const lower = text.toLowerCase();
    return LEAK_MARKERS.some((marker) => lower.includes(marker));
}

export const GUARDRAIL_REFUSAL =
    "Estimado, no puedo compartir instrucciones internas ni cambiar mi forma de responder. Con gusto puedo ayudarte con información sobre la experiencia, educación, habilidades o contacto de Jefferson.";
