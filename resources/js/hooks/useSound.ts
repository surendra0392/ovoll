import { useCallback, useRef } from 'react';

type SoundType = 'hover' | 'click' | 'success' | 'woosh' | 'tech';

interface SoundOptions {
    volume?: number;
    pitch?: number;
}

export function useSound(): { play: (type: SoundType, options?: SoundOptions) => void } {
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = (): AudioContext => {
        let ctx = audioCtxRef.current;

        if (!ctx) {
            const AudioContextCtor =
                window.AudioContext ||
                (window as Window & { webkitAudioContext?: typeof AudioContext })
                    .webkitAudioContext!;
            ctx = new AudioContextCtor();
            audioCtxRef.current = ctx;
        }

        if (ctx.state === 'suspended') {
            void ctx.resume();
        }

        return ctx;
    };

    const play = useCallback((type: SoundType, options: SoundOptions = {}) => {
        const ctx = initAudio();
        const t = ctx.currentTime;
        const volume = options.volume ?? 0.1;
        const pitch = options.pitch ?? 1;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        switch (type) {
            case 'hover':
                // Soft sine tick
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400 * pitch, t);
                osc.frequency.exponentialRampToValueAtTime(600 * pitch, t + 0.05);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(volume * 0.3, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
                osc.start(t);
                osc.stop(t + 0.05);
                break;
            case 'click':
                // Snappy triangle pop
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300 * pitch, t);
                osc.frequency.exponentialRampToValueAtTime(100 * pitch, t + 0.1);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(volume * 0.5, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                osc.start(t);
                osc.stop(t + 0.1);
                break;
            case 'tech': {
                // Sci-fi UI chirp
                osc.type = 'square';
                osc.frequency.setValueAtTime(1200 * pitch, t);
                osc.frequency.setValueAtTime(2000 * pitch, t + 0.05);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(volume * 0.1, t + 0.01);
                gain.gain.setValueAtTime(volume * 0.1, t + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

                // Add a lowpass filter for the square wave
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(3000, t);
                filter.frequency.exponentialRampToValueAtTime(500, t + 0.1);

                osc.disconnect();
                osc.connect(filter);
                filter.connect(gain);

                osc.start(t);
                osc.stop(t + 0.1);
                break;
            }
            case 'success':
                // Two-tone bell
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600 * pitch, t);
                osc.frequency.setValueAtTime(900 * pitch, t + 0.1);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(volume * 0.4, t + 0.01);
                gain.gain.linearRampToValueAtTime(volume * 0.2, t + 0.1);
                gain.gain.linearRampToValueAtTime(volume * 0.4, t + 0.11);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
                osc.start(t);
                osc.stop(t + 0.4);
                break;
            case 'woosh': {
                // Noise burst for transitions
                const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds of noise
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);

                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noise = ctx.createBufferSource();
                noise.buffer = buffer;

                const noiseFilter = ctx.createBiquadFilter();
                noiseFilter.type = 'bandpass';
                noiseFilter.frequency.setValueAtTime(200 * pitch, t);
                noiseFilter.frequency.exponentialRampToValueAtTime(1200 * pitch, t + 0.2);

                noise.connect(noiseFilter);
                noiseFilter.connect(gain);

                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(volume * 0.3, t + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

                noise.start(t);
                noise.stop(t + 0.5);
                break;
            }
        }
    }, []);

    return { play };
}
