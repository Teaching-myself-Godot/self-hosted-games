import type { ReadiumSpeechEngineProvider } from "../provider";
import type { ReadiumSpeechPlaybackEngine } from "../engine";
import type { ReadiumSpeechVoice } from "../voices";
import { WebSpeechEngine } from "./webSpeechEngine";

export class WebSpeechEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "webspeech";
  readonly name: string = "Web Speech API";

  private engine: WebSpeechEngine | null = null;

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    if (!this.engine) {
      throw new Error("No engine available. Create an engine first.");
    }
    return this.engine.getAvailableVoices();
  }

  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    const engine = new WebSpeechEngine();
    await engine.initialize();
    if (voice) {
      engine.setVoice(voice);
    }
    return engine;
  }

  async destroy(): Promise<void> {
    if (this.engine) {
      await this.engine.destroy();
      this.engine = null;
    }
  }
}
