import { useConductorTrack } from "../hooks/useConductorTrack";
import { usePlayer } from "../hooks/usePlayer";

export interface ConnectorEventEmitter {
  test: string
}

export interface SignalApi {
  changeTempo: (tempo: number) => void
}

export function useCreateSignalApi(): SignalApi {
  const { position, setCurrentTempo } = usePlayer();
  const { setTempo } = useConductorTrack();

  const changeTempoHelper = (tempo: number) => {
    setTempo(tempo, position)
    setCurrentTempo(tempo)
  }

  return {
    changeTempo: (tempo: number) => {
      changeTempoHelper(tempo);
    },
  }
}
