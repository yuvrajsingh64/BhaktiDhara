'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Song } from '@/data/songs';

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number; // 0 to 1
  progress: number; // 0 to 100
  currentTime: number; // in seconds
  duration: number; // in seconds
  isLiked: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  likedSongIds: string[];
}

export type PlayerAction =
  | { type: 'PLAY_SONG'; payload: Song }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'TOGGLE_LIKE'; payload?: string }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'ADD_TO_QUEUE'; payload: Song }
  | { type: 'SET_QUEUE'; payload: Song[] }
  | { type: 'PLAY_PLAYLIST'; payload: { songs: Song[]; startIndex?: number } }
  | { type: 'SET_IS_PLAYING'; payload: boolean }
  | { type: 'SET_LIKED_IDS'; payload: string[] };

function parseSongDuration(song?: Song | null): number {
  if (!song) return 0;
  if ('durationSeconds' in song && typeof song.durationSeconds === 'number') {
    return song.durationSeconds;
  }
  if (typeof song.duration === 'number') {
    return song.duration;
  }
  if (typeof song.duration === 'string') {
    const parts = song.duration.split(':').map((v) => Number(v.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  }
  return 0;
}

const initialState: PlayerState = {
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  currentTime: 0,
  duration: 0,
  isLiked: false,
  isShuffled: false,
  repeatMode: 'off',
  likedSongIds: [],
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_SONG': {
      const song = action.payload;
      const queueExists = state.queue.some((s) => s.id === song.id);
      const newQueue = queueExists ? state.queue : [...state.queue, song];
      const isLiked = state.likedSongIds.includes(song.id) || !!song.isLiked;
      const songDuration = parseSongDuration(song) || state.duration;

      return {
        ...state,
        currentSong: song,
        queue: newQueue,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: songDuration,
        isLiked,
      };
    }

    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };

    case 'RESUME':
      if (!state.currentSong && state.queue.length > 0) {
        const firstSong = state.queue[0];
        return {
          ...state,
          currentSong: firstSong,
          isPlaying: true,
          duration: parseSongDuration(firstSong),
          isLiked: state.likedSongIds.includes(firstSong.id) || !!firstSong.isLiked,
        };
      }
      return {
        ...state,
        isPlaying: state.currentSong !== null,
      };

    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
      };

    case 'NEXT_SONG': {
      if (state.queue.length === 0) return state;

      let nextIndex = 0;
      if (state.isShuffled && state.queue.length > 1) {
        const currentIndex = state.queue.findIndex(
          (s) => s.id === state.currentSong?.id
        );
        do {
          nextIndex = Math.floor(Math.random() * state.queue.length);
        } while (nextIndex === currentIndex && state.queue.length > 1);
      } else {
        const currentIndex = state.queue.findIndex(
          (s) => s.id === state.currentSong?.id
        );
        if (currentIndex === -1) {
          nextIndex = 0;
        } else if (currentIndex < state.queue.length - 1) {
          nextIndex = currentIndex + 1;
        } else {
          // At end of queue
          if (state.repeatMode === 'all') {
            nextIndex = 0;
          } else {
            // Repeat is off, stop playing
            return {
              ...state,
              isPlaying: false,
              progress: 0,
              currentTime: 0,
            };
          }
        }
      }

      const nextSong = state.queue[nextIndex];
      return {
        ...state,
        currentSong: nextSong,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: parseSongDuration(nextSong),
        isLiked: nextSong
          ? state.likedSongIds.includes(nextSong.id) || !!nextSong.isLiked
          : false,
      };
    }

    case 'PREV_SONG': {
      if (state.queue.length === 0) return state;

      const currentIndex = state.queue.findIndex(
        (s) => s.id === state.currentSong?.id
      );
      let prevIndex = 0;

      if (currentIndex > 0) {
        prevIndex = currentIndex - 1;
      } else if (currentIndex === 0 && state.repeatMode === 'all') {
        prevIndex = state.queue.length - 1;
      } else {
        prevIndex = 0;
      }

      const prevSong = state.queue[prevIndex];
      return {
        ...state,
        currentSong: prevSong,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: parseSongDuration(prevSong),
        isLiked: prevSong
          ? state.likedSongIds.includes(prevSong.id) || !!prevSong.isLiked
          : false,
      };
    }

    case 'SET_VOLUME': {
      const clamped = Math.max(0, Math.min(1, action.payload));
      return {
        ...state,
        volume: clamped,
      };
    }

    case 'SET_PROGRESS':
      return {
        ...state,
        progress: Math.max(0, Math.min(100, action.payload)),
      };

    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };

    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };

    case 'TOGGLE_LIKE': {
      const targetId = action.payload || state.currentSong?.id;
      if (!targetId) return state;

      const isCurrentlyLiked = state.likedSongIds.includes(targetId);
      const updatedLikes = isCurrentlyLiked
        ? state.likedSongIds.filter((id) => id !== targetId)
        : [...state.likedSongIds, targetId];

      const currentLiked = state.currentSong?.id === targetId
        ? !isCurrentlyLiked
        : state.currentSong
        ? updatedLikes.includes(state.currentSong.id)
        : false;

      return {
        ...state,
        likedSongIds: updatedLikes,
        isLiked: currentLiked,
      };
    }

    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled,
      };

    case 'TOGGLE_REPEAT': {
      const nextMode: Record<RepeatMode, RepeatMode> = {
        off: 'all',
        all: 'one',
        one: 'off',
      };
      return {
        ...state,
        repeatMode: nextMode[state.repeatMode],
      };
    }

    case 'ADD_TO_QUEUE': {
      const exists = state.queue.some((s) => s.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    }

    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
      };

    case 'PLAY_PLAYLIST': {
      const { songs, startIndex = 0 } = action.payload;
      if (!songs || songs.length === 0) return state;
      const chosenIndex = Math.max(0, Math.min(songs.length - 1, startIndex));
      const songToPlay = songs[chosenIndex];
      const isLiked =
        state.likedSongIds.includes(songToPlay.id) || !!songToPlay.isLiked;

      return {
        ...state,
        queue: songs,
        currentSong: songToPlay,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: parseSongDuration(songToPlay),
        isLiked,
      };
    }

    case 'SET_LIKED_IDS':
      return {
        ...state,
        likedSongIds: action.payload,
        isLiked: state.currentSong
          ? action.payload.includes(state.currentSong.id)
          : false,
      };

    default:
      return state;
  }
}

export interface PlayerContextType extends PlayerState {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setCurrentTime: (time: number) => void;
  seekTo: (progressPercent: number) => void;
  seekTime: (seconds: number) => void;
  toggleLike: (songId?: string) => void;
  isSongLiked: (songId: string) => boolean;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
  setQueue: (songs: Song[]) => void;
  playPlaylist: (songs: Song[], startIndex?: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);

  // Initialize saved volume and liked songs from localStorage on mount
  useEffect(() => {
    try {
      const savedVolume = localStorage.getItem('bhaktidhara_volume');
      if (savedVolume !== null) {
        const vol = parseFloat(savedVolume);
        if (!isNaN(vol)) {
          dispatch({ type: 'SET_VOLUME', payload: vol });
        }
      }

      const savedLikes = localStorage.getItem('bhaktidhara_liked_songs');
      if (savedLikes) {
        const parsed = JSON.parse(savedLikes);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET_LIKED_IDS', payload: parsed });
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. in incognito or SSR)
    }
  }, []);

  // Sync liked songs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bhaktidhara_liked_songs',
        JSON.stringify(state.likedSongIds)
      );
    } catch {
      // Ignore
    }
  }, [state.likedSongIds]);

  // Sync volume to localStorage and audio element
  useEffect(() => {
    try {
      localStorage.setItem('bhaktidhara_volume', state.volume.toString());
    } catch {
      // Ignore
    }
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Handle current song audio source change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentSong?.audioUrl && state.currentSong.audioUrl !== '#') {
      if (audio.src !== state.currentSong.audioUrl) {
        audio.src = state.currentSong.audioUrl;
        audio.load();
      }

      if (state.isPlaying) {
        audio.play().catch((err) => {
          console.warn('Autoplay prevented or audio load error:', err);
        });
      }
    } else if (state.currentSong?.audioUrl === '#') {
      // For placeholder audio URLs, do not fail silently or trigger media error
      audio.removeAttribute('src');
    } else {
      audio.pause();
      audio.removeAttribute('src');
    }
  }, [state.currentSong]);

  // Handle play/pause state change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;

    if (state.isPlaying) {
      if (state.currentSong.audioUrl && state.currentSong.audioUrl !== '#') {
        audio.play().catch((err) => {
          console.warn('Audio playback error:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  // Simulated playback for placeholder audio URLs ('#')
  const simTimeRef = useRef<number>(0);

  useEffect(() => {
    simTimeRef.current = state.currentTime;
  }, [state.currentTime]);

  useEffect(() => {
    const isPlaceholder =
      state.currentSong &&
      (!state.currentSong.audioUrl || state.currentSong.audioUrl === '#');

    if (!isPlaceholder || !state.isPlaying) {
      return;
    }

    const dur = state.duration || parseSongDuration(state.currentSong) || 300;

    const simInterval = setInterval(() => {
      const newTime = simTimeRef.current + 1;
      if (newTime >= dur) {
        clearInterval(simInterval);
        dispatch({ type: 'NEXT_SONG' });
        return;
      }
      simTimeRef.current = newTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
      dispatch({ type: 'SET_PROGRESS', payload: (newTime / dur) * 100 });
    }, 1000);

    return () => {
      clearInterval(simInterval);
    };
  }, [state.isPlaying, state.currentSong?.id, state.duration]);

  // Audio event listeners
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isSeekingRef.current) return;

    const current = audio.currentTime;
    const dur = audio.duration || state.duration || 0;
    const progress = dur > 0 ? (current / dur) * 100 : 0;

    dispatch({ type: 'SET_CURRENT_TIME', payload: current });
    dispatch({ type: 'SET_PROGRESS', payload: progress });
  }, [state.duration]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const dur = audio.duration;
    if (!isNaN(dur) && dur > 0) {
      dispatch({ type: 'SET_DURATION', payload: dur });
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (state.repeatMode === 'one') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.warn('Repeat audio error:', err));
      }
    } else {
      dispatch({ type: 'NEXT_SONG' });
    }
  }, [state.repeatMode]);

  const handlePlay = useCallback(() => {
    dispatch({ type: 'SET_IS_PLAYING', payload: true });
  }, []);

  const handlePause = useCallback(() => {
    dispatch({ type: 'SET_IS_PLAYING', payload: false });
  }, []);

  // Action methods
  const playSong = useCallback((song: Song) => {
    dispatch({ type: 'PLAY_SONG', payload: song });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' });
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      dispatch({ type: 'PAUSE' });
    } else {
      dispatch({ type: 'RESUME' });
    }
  }, [state.isPlaying]);

  const nextSong = useCallback(() => {
    dispatch({ type: 'NEXT_SONG' });
  }, []);

  const prevSong = useCallback(() => {
    const audio = audioRef.current;
    // If more than 3 seconds in, restart the song
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });
      dispatch({ type: 'SET_PROGRESS', payload: 0 });
      return;
    }
    dispatch({ type: 'PREV_SONG' });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  }, []);

  const setProgress = useCallback((progress: number) => {
    dispatch({ type: 'SET_PROGRESS', payload: progress });
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  }, []);

  const seekTo = useCallback(
    (progressPercent: number) => {
      const audio = audioRef.current;
      const clampedPercent = Math.max(0, Math.min(100, progressPercent));
      const dur = (audio && audio.duration) || state.duration || 0;
      const targetTime = (clampedPercent / 100) * dur;

      if (audio && !isNaN(targetTime)) {
        audio.currentTime = targetTime;
      }
      dispatch({ type: 'SET_CURRENT_TIME', payload: targetTime });
      dispatch({ type: 'SET_PROGRESS', payload: clampedPercent });
    },
    [state.duration]
  );

  const seekTime = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      const dur = (audio && audio.duration) || state.duration || 0;
      const clampedTime = Math.max(0, Math.min(dur, seconds));
      const progress = dur > 0 ? (clampedTime / dur) * 100 : 0;

      if (audio && !isNaN(clampedTime)) {
        audio.currentTime = clampedTime;
      }
      dispatch({ type: 'SET_CURRENT_TIME', payload: clampedTime });
      dispatch({ type: 'SET_PROGRESS', payload: progress });
    },
    [state.duration]
  );

  const toggleLike = useCallback((songId?: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: songId });
  }, []);

  const isSongLiked = useCallback(
    (songId: string) => {
      return state.likedSongIds.includes(songId);
    },
    [state.likedSongIds]
  );

  const toggleShuffle = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  }, []);

  const toggleRepeat = useCallback(() => {
    dispatch({ type: 'TOGGLE_REPEAT' });
  }, []);

  const addToQueue = useCallback((song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: song });
  }, []);

  const setQueue = useCallback((songs: Song[]) => {
    dispatch({ type: 'SET_QUEUE', payload: songs });
  }, []);

  const playPlaylist = useCallback((songs: Song[], startIndex: number = 0) => {
    dispatch({
      type: 'PLAY_PLAYLIST',
      payload: { songs, startIndex },
    });
  }, []);

  const value: PlayerContextType = {
    ...state,
    audioRef,
    playSong,
    pause,
    resume,
    togglePlay,
    nextSong,
    prevSong,
    setVolume,
    setProgress,
    setCurrentTime,
    seekTo,
    seekTime,
    toggleLike,
    isSongLiked,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    setQueue,
    playPlaylist,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata"
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextType {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
