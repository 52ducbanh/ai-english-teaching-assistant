import { ERROR_MESSAGES } from "../constants/messages";

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: ERROR_MESSAGES.NETWORK }));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  const json = await response.json();

  return (json.data !== undefined ? json.data : json) as T;
}

export async function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url);

  return parseResponse<T>(response);
}

export async function post<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
}
