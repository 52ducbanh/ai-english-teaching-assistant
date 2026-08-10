import { useState, useCallback, useRef } from "react";
import { getAssistantData } from "../services/assistant.service";
import { ERROR_MESSAGES } from "../constants/messages";
import type { AssistantDataResponse, GetAssistantRequest } from "../types/assistant";

interface UseAssistantState {
  data: AssistantDataResponse | null;
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
}

interface UseAssistantReturn extends UseAssistantState {
  fetchData: (req: GetAssistantRequest) => Promise<void>;
  reset: () => void;
}

const createInitialState = (): UseAssistantState => ({
  data: null,
  isLoading: false,
  error: null,
  hasFetched: false,
});

export function useAssistant(): UseAssistantReturn {
  const [state, setState] = useState<UseAssistantState>(createInitialState);
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async (req: GetAssistantRequest) => {
    const requestId = ++requestIdRef.current;
    setState({ ...createInitialState(), isLoading: true });

    try {
      const data = await getAssistantData(req);
      if (requestId !== requestIdRef.current) return;

      setState({ data, isLoading: false, error: null, hasFetched: true });
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      const message = err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN;
      setState({
        data: null,
        isLoading: false,
        error: message,
        hasFetched: true,
      });
    }
  }, []);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    setState(createInitialState());
  }, []);

  return { ...state, fetchData, reset };
}
