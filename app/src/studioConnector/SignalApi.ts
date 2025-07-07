import { useConductorTrack } from "../hooks/useConductorTrack"
import { usePlayer } from "../hooks/usePlayer"

export interface ConnectorEventEmitter {
  test: string
}

export interface SignalApi {
  changeTempo: (tempo: number) => void
}

export function createSignalApi(): SignalApi {
  const changeTempoHelper = (tempo: number) => {
    const { position, setCurrentTempo } = usePlayer()
    const { setTempo } = useConductorTrack()
    setTempo(tempo, position)
    setCurrentTempo(tempo)
  }

  return {
    changeTempo: (tempo: number) => {
      changeTempoHelper(tempo)
    },
  }
}
