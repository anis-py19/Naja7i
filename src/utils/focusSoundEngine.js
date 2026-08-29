// 🎧 Naja7i Zero-Dependency Web Audio Ambient Sound Synthesizer
// Generates realistic ambient noise & calming sounds offline using standard Web Audio API

class FocusSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.activeNodes = {};
    this.masterGain = null;
    this.currentSound = null;
    this.volume = 0.5;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  stopCurrent() {
    if (this.activeNodes.stop) {
      try {
        this.activeNodes.stop();
      } catch {
        // ignore
      }
    }
    this.activeNodes = {};
    this.currentSound = null;
  }

  stop() {
    this.stopCurrent();
  }

  playSound(soundId, volume) {
    if (volume !== undefined) {
      this.setVolume(volume);
    }
    if (soundId === 'rain') {
      this.playRain();
    } else if (soundId === 'brown') {
      this.playBrownNoise();
    } else if (soundId === 'fire') {
      this.playFireplace();
    } else if (soundId === 'waves') {
      this.playOceanWaves();
    } else {
      this.stop();
    }
  }

  // 1. 🌧️ Rain Sound Synthesizer
  playRain() {
    this.init();
    this.stopCurrent();
    if (!this.audioCtx) return;

    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    // Pink noise generation for rain
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter for smooth rainfall
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.masterGain);
    whiteNoise.start();

    this.activeNodes = {
      stop: () => {
        try { whiteNoise.stop(); } catch {}
      }
    };
    this.currentSound = 'rain';
  }

  // 2. 📻 Deep Focus Brown Noise Synthesizer (Ideal for Brainwave Focus)
  playBrownNoise() {
    this.init();
    this.stopCurrent();
    if (!this.audioCtx) return;

    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    const brownNoise = this.audioCtx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

    brownNoise.connect(filter);
    filter.connect(this.masterGain);
    brownNoise.start();

    this.activeNodes = {
      stop: () => {
        try { brownNoise.stop(); } catch {}
      }
    };
    this.currentSound = 'brown';
  }

  // 3. 🔥 Cozy Fireplace Synthesizer
  playFireplace() {
    this.init();
    this.stopCurrent();
    if (!this.audioCtx) return;

    // Low rumble noise + occasional crackle impulses
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const isCrackle = Math.random() < 0.0008;
      const crackle = isCrackle ? (Math.random() * 2 - 1) * 0.8 : 0;
      const white = (Math.random() * 2 - 1) * 0.05;
      output[i] = white + crackle;
    }

    const fireSource = this.audioCtx.createBufferSource();
    fireSource.buffer = noiseBuffer;
    fireSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.audioCtx.currentTime);

    fireSource.connect(filter);
    filter.connect(this.masterGain);
    fireSource.start();

    this.activeNodes = {
      stop: () => {
        try { fireSource.stop(); } catch {}
      }
    };
    this.currentSound = 'fire';
  }

  // 4. 🌊 Gentle Ocean Waves Synthesizer
  playWaves() {
    this.init();
    this.stopCurrent();
    if (!this.audioCtx) return;

    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const waveSource = this.audioCtx.createBufferSource();
    waveSource.buffer = noiseBuffer;
    waveSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

    // LFO for wave modulation
    const lfo = this.audioCtx.createOscillator();
    const lfoGain = this.audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.12, this.audioCtx.currentTime); // 8s wave cycle
    lfoGain.gain.setValueAtTime(250, this.audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    waveSource.connect(filter);
    filter.connect(this.masterGain);

    waveSource.start();
    lfo.start();

    this.activeNodes = {
      stop: () => {
        try {
          waveSource.stop();
          lfo.stop();
        } catch {}
      }
    };
    this.currentSound = 'waves';
  }

  // 5. 🔔 Bell Chime for Session Completion
  playCompletionChime() {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.15);

      gain.gain.setValueAtTime(0.0001, now + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.3, now + index * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.15 + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 2.0);
    });
  }
}

export const focusSoundEngine = new FocusSoundEngine();
