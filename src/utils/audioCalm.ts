// Web Audio API ambient sound generator (Brownian/Pink noise for soothing rain and ocean calm)
// Runs entirely offline in browser without external media files

let audioCtx: AudioContext | null = null;
let noiseNode: AudioNode | null = null;
let gainNode: GainNode | null = null;

export const playCalmingRain = () => {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    stopCalmingAudio();

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pinkish-brown soothing noise (gentle rain / wind)
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain adjustment
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to make it soft like rain on leaves
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 1.5);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();
    noiseNode = whiteNoise;
    return true;
  } catch (e) {
    console.error('Audio playback error', e);
    return false;
  }
};

export const stopCalmingAudio = () => {
  if (noiseNode) {
    try {
      (noiseNode as AudioBufferSourceNode).stop();
      noiseNode.disconnect();
    } catch {
      // ignore
    }
    noiseNode = null;
  }
};

export const audioCalm = {
  playRain: playCalmingRain,
  stopRain: stopCalmingAudio,
};
