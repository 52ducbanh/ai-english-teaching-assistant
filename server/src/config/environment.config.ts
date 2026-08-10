import * as dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

const DEFAULT_DEVELOPMENT_CORS_ORIGINS = ["http://localhost:5173"];
const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";
const DEFAULT_GEMINI_TIMEOUT_MS = 20_000;
const DEFAULT_GEMINI_MAX_OUTPUT_TOKENS = 2_048;
const DEFAULT_GEMINI_THINKING_LEVEL = "minimal";
const GEMINI_THINKING_LEVELS = ["minimal", "low", "medium", "high"] as const;

type GeminiThinkingLevel = (typeof GEMINI_THINKING_LEVELS)[number];

function requireEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function parsePort(value: string, name: string): number {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`${name} must be an integer between 1 and 65535.`);
  }

  return port;
}

function parsePositiveInteger(value: string | undefined, name: string, fallback: number): number {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return parsedValue;
}

function parseGeminiThinkingLevel(value: string | undefined): GeminiThinkingLevel {
  const thinkingLevel = value?.trim().toLowerCase() || DEFAULT_GEMINI_THINKING_LEVEL;

  if (!GEMINI_THINKING_LEVELS.includes(thinkingLevel as GeminiThinkingLevel)) {
    throw new Error(`GEMINI_THINKING_LEVEL must be one of: ${GEMINI_THINKING_LEVELS.join(", ")}.`);
  }

  return thinkingLevel as GeminiThinkingLevel;
}

function parseCorsOrigins(value: string | undefined, isProduction: boolean): string[] {
  const origins = value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins?.length) {
    return origins;
  }

  if (isProduction) {
    throw new Error("CORS_ORIGINS must be configured when NODE_ENV is production.");
  }

  return DEFAULT_DEVELOPMENT_CORS_ORIGINS;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProduction = nodeEnv === "production";
const synchronize = process.env.DB_SYNCHRONIZE === "true";

if (isProduction && synchronize) {
  throw new Error("DB_SYNCHRONIZE cannot be enabled in production. Use migrations instead.");
}

export const environment = {
  nodeEnv,
  isProduction,
  port: parsePort(process.env.PORT ?? "3000", "PORT"),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS, isProduction),
  database: {
    host: requireEnvironmentValue("DB_HOST"),
    port: parsePort(requireEnvironmentValue("DB_PORT"), "DB_PORT"),
    username: requireEnvironmentValue("DB_USERNAME"),
    password: requireEnvironmentValue("DB_PASSWORD"),
    name: requireEnvironmentValue("DB_NAME"),
    synchronize,
    logging: process.env.DB_LOGGING === "true",
  },
  gemini: {
    // The API key is intentionally optional at boot so the non-AI API can run
    // without it. GeminiService returns a clear 503 when chat is requested.
    apiKey: process.env.GEMINI_API_KEY?.trim() || undefined,
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
    timeoutMs: parsePositiveInteger(process.env.GEMINI_TIMEOUT_MS, "GEMINI_TIMEOUT_MS", DEFAULT_GEMINI_TIMEOUT_MS),
    maxOutputTokens: parsePositiveInteger(
      process.env.GEMINI_MAX_OUTPUT_TOKENS,
      "GEMINI_MAX_OUTPUT_TOKENS",
      DEFAULT_GEMINI_MAX_OUTPUT_TOKENS,
    ),
    thinkingLevel: parseGeminiThinkingLevel(process.env.GEMINI_THINKING_LEVEL),
  },
} as const;
