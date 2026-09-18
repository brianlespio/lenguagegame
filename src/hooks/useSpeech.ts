import { useCallback, useEffect, useRef, useState } from "react";
import { TTS_FORM_GAP_MS } from "../constants";
import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { pickVoice, ttsLangForPair, ttsPhrases, ttsRateForEntry } from "../utils/speech";

export function useSpeech() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const generationRef = useRef(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const refresh = () => setVoices(synth.getVoices());
    refresh();
    synth.addEventListener("voiceschanged", refresh);
    return () => {
      generationRef.current += 1;
      synth.removeEventListener("voiceschanged", refresh);
      synth.cancel();
    };
  }, [supported]);

  const cancel = useCallback(() => {
    generationRef.current += 1;
    window.speechSynthesis?.cancel();
  }, []);

  const speakEntry = useCallback(
    (entry: VocabularyEntry, pair: LanguagePairId, intervalMs: number) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      const phrases = ttsPhrases(entry, intervalMs).filter((phrase) => phrase.trim().length > 0);
      if (phrases.length === 0) return;

      const lang = ttsLangForPair(pair);
      const voice = pickVoice(voices, lang);
      const generation = generationRef.current + 1;
      generationRef.current = generation;
      synth.cancel();

      const speakAt = (index: number) => {
        if (generation !== generationRef.current) return;
        const text = phrases[index];
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voice?.lang || lang;
        utterance.rate = ttsRateForEntry(entry);
        utterance.pitch = 1;
        if (voice) utterance.voice = voice;
        utterance.onend = () => {
          if (generation !== generationRef.current) return;
          if (index + 1 >= phrases.length) return;
          window.setTimeout(() => speakAt(index + 1), TTS_FORM_GAP_MS);
        };
        synth.speak(utterance);
      };

      window.setTimeout(() => speakAt(0), 20);
    },
    [supported, voices],
  );

  const speakText = useCallback(
    (text: string, lang: string, rate: number) => {
      if (!supported) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      const synth = window.speechSynthesis;
      const voice = pickVoice(voices, lang);
      const generation = generationRef.current + 1;
      generationRef.current = generation;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(trimmed);
      utterance.lang = voice?.lang || lang;
      utterance.rate = rate;
      utterance.pitch = 1;
      if (voice) utterance.voice = voice;
      window.setTimeout(() => {
        if (generation !== generationRef.current) return;
        synth.speak(utterance);
      }, 20);
    },
    [supported, voices],
  );

  return { supported, speakEntry, speakText, cancel };
}
