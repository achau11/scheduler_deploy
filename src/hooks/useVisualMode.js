import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    !replace ? setHistory(prev => [...prev, newMode]) : setHistory(prev => [...prev.slice(0, -1), newMode]);
    setMode(newMode);
  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  
  return { mode, transition, back}
}