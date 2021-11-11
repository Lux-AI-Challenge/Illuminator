interface RunEpisodeIn {
  id: string;
  agents: string[];
}
type RunEpisodeRet = void;

interface RunSingleEpisodeIn {
  env: string;
  agents: string[];
  seed?: number;
}
interface RunSingleEpsiodeRet {
  final: any;
}
