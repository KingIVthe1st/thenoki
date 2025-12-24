"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as Tone from "tone";

// ============================================
// AUDIO ENGINE - Premium Sound Experience
// ============================================
// Ambient drone + UI interaction sounds:
// - Hover: soft crystalline chime
// - Click: satisfying "pop" with decay
// - Scroll: subtle wind/whoosh at high speed
// - Ambient: dreamy pad that shifts with scroll position

interface AudioContextType {
  isEnabled: boolean;
  isMuted: boolean;
  enableAudio: () => Promise<void>;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  setScrollSpeed: (speed: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

// Custom hook to use audio
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

// Optional hook that doesn't throw - for components outside provider
export function useAudioOptional() {
  return useContext(AudioContext);
}

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const isInitializedRef = useRef(false);

  // Synths for different sounds
  const hoverSynthRef = useRef<Tone.Synth | null>(null);
  const clickSynthRef = useRef<Tone.MembraneSynth | null>(null);
  const successSynthRef = useRef<Tone.PolySynth | null>(null);
  const ambientSynthRef = useRef<Tone.Synth | null>(null);
  const windNoiseRef = useRef<Tone.Noise | null>(null);

  // Effects
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const windFilterRef = useRef<Tone.Filter | null>(null);
  const windGainRef = useRef<Tone.Gain | null>(null);

  // Initialize audio system
  const enableAudio = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      await Tone.start();
      console.log("Audio context started");

      // Create effects chain
      reverbRef.current = new Tone.Reverb({
        decay: 3,
        wet: 0.4,
      }).toDestination();
      await reverbRef.current.generate();

      delayRef.current = new Tone.FeedbackDelay({
        delayTime: "8n",
        feedback: 0.3,
        wet: 0.2,
      }).connect(reverbRef.current);

      filterRef.current = new Tone.Filter({
        type: "lowpass",
        frequency: 2000,
        Q: 1,
      }).connect(delayRef.current);

      // Hover synth - soft crystalline bell
      hoverSynthRef.current = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0,
          release: 0.5,
        },
        volume: -20,
      }).connect(filterRef.current);

      // Click synth - satisfying membrane "pop"
      clickSynthRef.current = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0,
          release: 0.3,
        },
        volume: -15,
      }).connect(reverbRef.current);

      // Success synth - harmonious chord
      successSynthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0.2,
          release: 0.8,
        },
        volume: -18,
      }).connect(reverbRef.current);

      // Ambient drone synth
      ambientSynthRef.current = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 2,
          decay: 1,
          sustain: 0.8,
          release: 4,
        },
        volume: -35,
      }).connect(reverbRef.current);

      // Wind noise for scroll (starts silent)
      windFilterRef.current = new Tone.Filter({
        type: "bandpass",
        frequency: 800,
        Q: 2,
      }).connect(reverbRef.current);

      windGainRef.current = new Tone.Gain(0).connect(windFilterRef.current);

      windNoiseRef.current = new Tone.Noise({
        type: "pink",
        volume: -25,
      }).connect(windGainRef.current);

      windNoiseRef.current.start();

      // Start ambient drone
      ambientSynthRef.current.triggerAttack("C2");

      isInitializedRef.current = true;
      setIsEnabled(true);
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (newMuted) {
        Tone.Destination.mute = true;
      } else {
        Tone.Destination.mute = false;
      }
      return newMuted;
    });
  }, []);

  // Play hover sound
  const playHover = useCallback(() => {
    if (!isEnabled || isMuted || !hoverSynthRef.current) return;

    // Random high note for variety
    const notes = ["C5", "E5", "G5", "B5", "D6"];
    const note = notes[Math.floor(Math.random() * notes.length)];
    hoverSynthRef.current.triggerAttackRelease(note, "16n");
  }, [isEnabled, isMuted]);

  // Play click sound
  const playClick = useCallback(() => {
    if (!isEnabled || isMuted || !clickSynthRef.current) return;

    clickSynthRef.current.triggerAttackRelease("C2", "8n");
  }, [isEnabled, isMuted]);

  // Play success sound (chord)
  const playSuccess = useCallback(() => {
    if (!isEnabled || isMuted || !successSynthRef.current) return;

    successSynthRef.current.triggerAttackRelease(
      ["C4", "E4", "G4", "B4"],
      "4n",
    );
  }, [isEnabled, isMuted]);

  // Update wind noise based on scroll speed
  const setScrollSpeed = useCallback(
    (speed: number) => {
      if (!isEnabled || !windGainRef.current || !windFilterRef.current) return;

      // Normalize speed (0-1)
      const normalizedSpeed = Math.min(Math.abs(speed) / 50, 1);

      // Adjust wind volume and filter based on speed
      windGainRef.current.gain.rampTo(normalizedSpeed * 0.5, 0.1);
      windFilterRef.current.frequency.rampTo(400 + normalizedSpeed * 1200, 0.1);
    },
    [isEnabled],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isInitializedRef.current) {
        hoverSynthRef.current?.dispose();
        clickSynthRef.current?.dispose();
        successSynthRef.current?.dispose();
        ambientSynthRef.current?.dispose();
        windNoiseRef.current?.dispose();
        reverbRef.current?.dispose();
        delayRef.current?.dispose();
        filterRef.current?.dispose();
        windFilterRef.current?.dispose();
        windGainRef.current?.dispose();
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isEnabled,
        isMuted,
        enableAudio,
        toggleMute,
        playHover,
        playClick,
        playSuccess,
        setScrollSpeed,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

// Audio toggle button component
export function AudioToggle({ className = "" }: { className?: string }) {
  const { isEnabled, isMuted, enableAudio, toggleMute } = useAudio();

  const handleClick = async () => {
    if (!isEnabled) {
      await enableAudio();
    } else {
      toggleMute();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center
        bg-white/60 backdrop-blur-md border border-white/80
        hover:bg-white/80 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400
        ${className}
      `}
      aria-label={
        !isEnabled ? "Enable audio" : isMuted ? "Unmute audio" : "Mute audio"
      }
    >
      {!isEnabled ? (
        // Speaker with plus
        <svg
          className="w-5 h-5 text-purple-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="17" y1="9" x2="17" y2="15" />
          <line x1="14" y1="12" x2="20" y2="12" />
        </svg>
      ) : isMuted ? (
        // Muted speaker
        <svg
          className="w-5 h-5 text-purple-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Speaker with waves
        <svg
          className="w-5 h-5 text-purple-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}

export default AudioProvider;
