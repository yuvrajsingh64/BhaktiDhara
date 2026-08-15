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
import { bhaktiPlaylists } from '@/data/bhaktiPlaylists';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  currentTime: number;
  duration: number;
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
  | { type: 'PLAY_PLAYLIST'; payload: { songs: Song[]; startIndex?: number; autoPlay?: boolean } }
  | { type: 'SET_IS_PLAYING'; payload: boolean }
  | { type: 'SET_LIKED_IDS'; payload: string[] }
  | { type: 'JUMP_TO_INDEX'; payload: number }
  | { type: 'UPDATE_YT_SONG'; payload: { title: string; artist: string; index: number } };

function parseSongDuration(song?: Song | null): number {
  if (!song) return 0;
  if (typeof song.durationSeconds === 'number') return song.durationSeconds;
  if (typeof song.duration === 'string') {
    const parts = song.duration.split(':').map((v) => Number(v.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return parts[0] * 60 + parts[1];
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) return parts[0] * 3600 + parts[1] * 60 + parts[2];
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
      return {
        ...state,
        currentSong: song,
        queue: newQueue,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: parseSongDuration(song) || state.duration,
        isLiked: state.likedSongIds.includes(song.id) || !!song.isLiked,
      };
    }

    case 'PAUSE':
      return { ...state, isPlaying: false };

    case 'RESUME':
      if (!state.currentSong && state.queue.length > 0) {
        const firstSong = state.queue[0];
        return {
          ...state, currentSong: firstSong, isPlaying: true,
          duration: parseSongDuration(firstSong),
          isLiked: state.likedSongIds.includes(firstSong.id) || !!firstSong.isLiked,
        };
      }
      return { ...state, isPlaying: state.currentSong !== null };

    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'NEXT_SONG': {
      if (state.queue.length === 0) return state;
      const currentIndex = state.queue.findIndex((s) => s.id === state.currentSong?.id);
      let nextIndex: number;
      if (state.isShuffled && state.queue.length > 1) {
        do { nextIndex = Math.floor(Math.random() * state.queue.length); } while (nextIndex === currentIndex);
      } else if (currentIndex < state.queue.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (state.repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return { ...state, isPlaying: false, progress: 0, currentTime: 0 };
      }
      const nextSong = state.queue[nextIndex];
      return {
        ...state, currentSong: nextSong, isPlaying: true, progress: 0, currentTime: 0,
        duration: parseSongDuration(nextSong),
        isLiked: nextSong ? state.likedSongIds.includes(nextSong.id) || !!nextSong.isLiked : false,
      };
    }

    case 'PREV_SONG': {
      if (state.queue.length === 0) return state;
      const currentIndex = state.queue.findIndex((s) => s.id === state.currentSong?.id);
      let prevIndex = currentIndex > 0 ? currentIndex - 1 : (state.repeatMode === 'all' ? state.queue.length - 1 : 0);
      const prevSong = state.queue[prevIndex];
      return {
        ...state, currentSong: prevSong, isPlaying: true, progress: 0, currentTime: 0,
        duration: parseSongDuration(prevSong),
        isLiked: prevSong ? state.likedSongIds.includes(prevSong.id) || !!prevSong.isLiked : false,
      };
    }

    case 'SET_VOLUME':
      return { ...state, volume: Math.max(0, Math.min(1, action.payload)) };
    case 'SET_PROGRESS':
      return { ...state, progress: Math.max(0, Math.min(100, action.payload)) };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };

    case 'TOGGLE_LIKE': {
      const targetId = action.payload || state.currentSong?.id;
      if (!targetId) return state;
      const isCurrentlyLiked = state.likedSongIds.includes(targetId);
      const updatedLikes = isCurrentlyLiked ? state.likedSongIds.filter((id) => id !== targetId) : [...state.likedSongIds, targetId];
      return {
        ...state, likedSongIds: updatedLikes,
        isLiked: state.currentSong?.id === targetId ? !isCurrentlyLiked : (state.currentSong ? updatedLikes.includes(state.currentSong.id) : false),
      };
    }

    case 'TOGGLE_SHUFFLE':
      return { ...state, isShuffled: !state.isShuffled };

    case 'TOGGLE_REPEAT': {
      const nextMode: Record<RepeatMode, RepeatMode> = { off: 'all', all: 'one', one: 'off' };
      return { ...state, repeatMode: nextMode[state.repeatMode] };
    }

    case 'ADD_TO_QUEUE': {
      if (state.queue.some((s) => s.id === action.payload.id)) return state;
      return { ...state, queue: [...state.queue, action.payload] };
    }

    case 'SET_QUEUE':
      return { ...state, queue: action.payload };

    case 'PLAY_PLAYLIST': {
      const { songs, startIndex = 0, autoPlay = true } = action.payload;
      if (!songs || songs.length === 0) return state;
      const idx = Math.max(0, Math.min(songs.length - 1, startIndex));
      const songToPlay = songs[idx];
      return {
        ...state, queue: songs, currentSong: songToPlay, isPlaying: autoPlay,
        progress: 0, currentTime: 0, duration: parseSongDuration(songToPlay),
        isLiked: state.likedSongIds.includes(songToPlay.id) || !!songToPlay.isLiked,
      };
    }

    case 'JUMP_TO_INDEX': {
      const idx = action.payload;
      if (idx < 0 || idx >= state.queue.length) return state;
      const song = state.queue[idx];
      return {
        ...state, currentSong: song, isPlaying: true, progress: 0, currentTime: 0,
        duration: parseSongDuration(song),
        isLiked: state.likedSongIds.includes(song.id) || !!song.isLiked,
      };
    }

    case 'UPDATE_YT_SONG': {
      if (!state.currentSong) return state;
      const { title, artist, index } = action.payload;
      const updatedSong: Song = {
        ...state.currentSong,
        title: title,
        titleHindi: undefined,
        artist: artist || 'YouTube Music',
      };
      // Also update the song in the queue so the list reflects real names
      const updatedQueue = [...state.queue];
      if (index >= 0 && index < updatedQueue.length) {
        updatedQueue[index] = { ...updatedQueue[index], title, titleHindi: undefined, artist: artist || updatedQueue[index].artist };
      }
      return {
        ...state,
        currentSong: updatedSong,
        queue: updatedQueue,
      };
    }

    case 'SET_LIKED_IDS':
      return {
        ...state, likedSongIds: action.payload,
        isLiked: state.currentSong ? action.payload.includes(state.currentSong.id) : false,
      };

    default:
      return state;
  }
}

// ────────────────────────────────────────────────────────────────
// Context type
// ────────────────────────────────────────────────────────────────

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
  playPlaylist: (songs: Song[], startIndex?: number, youtubePlaylistId?: string, autoPlay?: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// ────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);

  // ── Simulation refs ──
  const simTimeRef = useRef<number>(0);

  // ── YouTube refs ──
  const ytPlayerRef = useRef<any>(null);
  const ytApiReady = useRef(false);
  const isYtMode = useRef(false);
  const ytPlaylistIdRef = useRef<string | null>(null);
  const queueRef = useRef<Song[]>([]);
  const currentSongRef = useRef<Song | null>(null);
  // Tracks playlist load generation to discard stale YT events after switching playlists
  const playlistGenRef = useRef<number>(0);
  // The event generation that the current PLAYING listener should trust
  const expectedGenRef = useRef<number>(0);
  // The index we actually requested when calling loadPlaylist
  const pendingStartIndexRef = useRef<number>(0);
  // Whether we are waiting for the first PLAYING event after a new loadPlaylist call
  const awaitingFirstPlayRef = useRef<boolean>(false);

  // Keep refs in sync
  useEffect(() => { queueRef.current = state.queue; }, [state.queue]);
  useEffect(() => { currentSongRef.current = state.currentSong; }, [state.currentSong]);
  useEffect(() => { simTimeRef.current = state.currentTime; }, [state.currentTime]);


  // ── Load YouTube IFrame API ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPlayer = () => {
      ytApiReady.current = true;
      if (!ytPlayerRef.current && document.getElementById('bhakti-yt-player')) {
        ytPlayerRef.current = new (window as any).YT.Player('bhakti-yt-player', {
          height: '1',
          width: '1',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              try {
                if (ytPlaylistIdRef.current) {
                  event.target.playVideo();
                }
              } catch { /* ignore */ }
            },
            onStateChange: handleYtStateChange,
            onError: (e: any) => console.warn('YT Player error:', e.data),
          },
        });
      }
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const first = document.getElementsByTagName('script')[0];
      first?.parentNode?.insertBefore(tag, first);

      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  // ── YouTube state change handler ──
  function handleYtStateChange(event: any) {
    if (!isYtMode.current) return;

    // YT.PlayerState: UNSTARTED=-1, ENDED=0, PLAYING=1, PAUSED=2, BUFFERING=3, CUED=5
    switch (event.data) {
      case 1: { // PLAYING
        dispatch({ type: 'SET_IS_PLAYING', payload: true });

        try {
          const queue = queueRef.current;
          let resolvedIdx: number;

          if (awaitingFirstPlayRef.current && expectedGenRef.current === playlistGenRef.current) {
            // First PLAYING event after a new loadPlaylist — trust our requested index, not YouTube's
            resolvedIdx = pendingStartIndexRef.current;
            awaitingFirstPlayRef.current = false;
          } else {
            // Normal play/next/prev — trust YouTube's reported index
            const ytIdx = event.target.getPlaylistIndex();
            resolvedIdx = ytIdx;
          }

          if (resolvedIdx >= 0 && resolvedIdx < queue.length) {
            dispatch({ type: 'JUMP_TO_INDEX', payload: resolvedIdx });
          }

          // Update with real YouTube video title & artist
          const videoData = event.target.getVideoData();
          if (videoData?.title) {
            dispatch({
              type: 'UPDATE_YT_SONG',
              payload: {
                title: videoData.title,
                artist: videoData.author || 'YouTube Music',
                index: resolvedIdx,
              },
            });
          }
        } catch { /* ignore */ }
        break;
      }
      case 2: // PAUSED
        dispatch({ type: 'SET_IS_PLAYING', payload: false });
        break;
      case 0: // ENDED (single video ended; YT auto-advances in playlist)
        break;
    }
  }

  // ── YouTube time sync ──
  useEffect(() => {
    if (!state.isPlaying || !isYtMode.current) return;

    const syncInterval = setInterval(() => {
      try {
        const yt = ytPlayerRef.current;
        if (!yt?.getCurrentTime || !yt?.getDuration) return;
        const ct = yt.getCurrentTime();
        const dur = yt.getDuration();
        if (dur > 0) {
          dispatch({ type: 'SET_CURRENT_TIME', payload: ct });
          dispatch({ type: 'SET_DURATION', payload: dur });
          dispatch({ type: 'SET_PROGRESS', payload: (ct / dur) * 100 });
        }
      } catch { /* player not ready */ }
    }, 500);

    return () => clearInterval(syncInterval);
  }, [state.isPlaying, state.currentSong?.id]);

  // ── One-time initialisation: cue first playlist on app mount (paused — shows ► Play button) ──
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    const first = bhaktiPlaylists[0];
    if (first) {
      // Use a small delay so the YT API has time to set up
      setTimeout(() => {
        playPlaylist(first.songs, 0, first.youtubePlaylistId, false);
      }, 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── LocalStorage: volume & liked songs ──
  useEffect(() => {
    try {
      const sv = localStorage.getItem('bhaktidhara_volume');
      if (sv !== null) { const v = parseFloat(sv); if (!isNaN(v)) dispatch({ type: 'SET_VOLUME', payload: v }); }
      const sl = localStorage.getItem('bhaktidhara_liked_songs');
      if (sl) { const p = JSON.parse(sl); if (Array.isArray(p)) dispatch({ type: 'SET_LIKED_IDS', payload: p }); }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('bhaktidhara_liked_songs', JSON.stringify(state.likedSongIds)); } catch { /* ignore */ }
  }, [state.likedSongIds]);

  useEffect(() => {
    try { localStorage.setItem('bhaktidhara_volume', state.volume.toString()); } catch { /* ignore */ }
    if (audioRef.current) audioRef.current.volume = state.volume;
    // Sync YT volume
    if (isYtMode.current && ytPlayerRef.current?.setVolume) {
      try { ytPlayerRef.current.setVolume(state.volume * 100); } catch { /* ignore */ }
    }
  }, [state.volume]);

  // ── Audio element: source management (NON-YT mode only) ──
  useEffect(() => {
    if (isYtMode.current) return; // YouTube handles audio
    const audio = audioRef.current;
    if (!audio) return;
    if (state.currentSong?.audioUrl && state.currentSong.audioUrl !== '#') {
      if (audio.src !== state.currentSong.audioUrl) { audio.src = state.currentSong.audioUrl; audio.load(); }
      if (state.isPlaying) audio.play().catch(() => {});
    } else {
      audio.removeAttribute('src');
    }
  }, [state.currentSong]);

  // ── Audio element: play/pause (NON-YT mode only) ──
  useEffect(() => {
    if (isYtMode.current) return;
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;
    if (state.isPlaying && state.currentSong.audioUrl && state.currentSong.audioUrl !== '#') {
      audio.play().catch(() => {});
    } else if (!state.isPlaying) {
      audio.pause();
    }
  }, [state.isPlaying]);

  // ── Simulated playback for placeholder audio (NON-YT mode only) ──
  useEffect(() => {
    if (isYtMode.current) return; // YouTube handles playback
    const isPlaceholder = state.currentSong && (!state.currentSong.audioUrl || state.currentSong.audioUrl === '#');
    if (!isPlaceholder || !state.isPlaying) return;

    const dur = state.duration || parseSongDuration(state.currentSong) || 300;
    const simInterval = setInterval(() => {
      const newTime = simTimeRef.current + 1;
      if (newTime >= dur) { clearInterval(simInterval); dispatch({ type: 'NEXT_SONG' }); return; }
      simTimeRef.current = newTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
      dispatch({ type: 'SET_PROGRESS', payload: (newTime / dur) * 100 });
    }, 1000);
    return () => clearInterval(simInterval);
  }, [state.isPlaying, state.currentSong?.id, state.duration]);

  // ── Audio event handlers (NON-YT mode) ──
  const handleTimeUpdate = useCallback(() => {
    if (isYtMode.current) return;
    const audio = audioRef.current;
    if (!audio || isSeekingRef.current) return;
    const current = audio.currentTime;
    const dur = audio.duration || state.duration || 0;
    dispatch({ type: 'SET_CURRENT_TIME', payload: current });
    dispatch({ type: 'SET_PROGRESS', payload: dur > 0 ? (current / dur) * 100 : 0 });
  }, [state.duration]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const dur = audio.duration;
    if (!isNaN(dur) && dur > 0) dispatch({ type: 'SET_DURATION', payload: dur });
  }, []);

  const handleEnded = useCallback(() => {
    if (isYtMode.current) return;
    if (state.repeatMode === 'one') {
      const audio = audioRef.current;
      if (audio) { audio.currentTime = 0; audio.play().catch(() => {}); }
    } else {
      dispatch({ type: 'NEXT_SONG' });
    }
  }, [state.repeatMode]);

  const handlePlay = useCallback(() => {
    if (isYtMode.current) return;
    const isPlaceholder = state.currentSong && (!state.currentSong.audioUrl || state.currentSong.audioUrl === '#');
    if (!isPlaceholder) dispatch({ type: 'SET_IS_PLAYING', payload: true });
  }, [state.currentSong]);

  const handlePause = useCallback(() => {
    if (isYtMode.current) return;
    const isPlaceholder = state.currentSong && (!state.currentSong.audioUrl || state.currentSong.audioUrl === '#');
    if (!isPlaceholder) dispatch({ type: 'SET_IS_PLAYING', payload: false });
  }, [state.currentSong]);

  // ────────────────────────────────────────────────────────────
  // Action methods
  // ────────────────────────────────────────────────────────────

  const playSong = useCallback((song: Song) => {
    dispatch({ type: 'PLAY_SONG', payload: song });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
    if (isYtMode.current && ytPlayerRef.current?.pauseVideo) {
      try { ytPlayerRef.current.pauseVideo(); } catch { /* ignore */ }
    }
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' });
    if (isYtMode.current && ytPlayerRef.current) {
      try {
        const yt = ytPlayerRef.current;
        if (yt.playVideo) {
          yt.playVideo();
        }
        // If player was unstarted (-1) or cued (5), load/play playlist at current index
        const pState = yt.getPlayerState ? yt.getPlayerState() : -1;
        if (ytPlaylistIdRef.current && (pState === -1 || pState === 5)) {
          const currentIndex = queueRef.current.findIndex(s => s.id === currentSongRef.current?.id);
          yt.loadPlaylist({
            list: ytPlaylistIdRef.current,
            listType: 'playlist',
            index: Math.max(0, currentIndex),
          });
        }
      } catch (e) {
        console.warn('Resume error:', e);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      dispatch({ type: 'PAUSE' });
      if (isYtMode.current && ytPlayerRef.current?.pauseVideo) {
        try { ytPlayerRef.current.pauseVideo(); } catch { /* ignore */ }
      }
    } else {
      dispatch({ type: 'RESUME' });
      if (isYtMode.current && ytPlayerRef.current) {
        try {
          const yt = ytPlayerRef.current;
          if (yt.playVideo) {
            yt.playVideo();
          }
          const pState = yt.getPlayerState ? yt.getPlayerState() : -1;
          if (ytPlaylistIdRef.current && (pState === -1 || pState === 5)) {
            const currentIndex = queueRef.current.findIndex(s => s.id === currentSongRef.current?.id);
            yt.loadPlaylist({
              list: ytPlaylistIdRef.current,
              listType: 'playlist',
              index: Math.max(0, currentIndex),
            });
          }
        } catch (e) {
          console.warn('TogglePlay error:', e);
        }
      }
    }
  }, [state.isPlaying]);

  const nextSong = useCallback(() => {
    if (isYtMode.current && ytPlayerRef.current?.nextVideo) {
      try { ytPlayerRef.current.nextVideo(); } catch { /* ignore */ }
      // State update happens via onStateChange → JUMP_TO_INDEX
      return;
    }
    dispatch({ type: 'NEXT_SONG' });
  }, []);

  const prevSong = useCallback(() => {
    if (isYtMode.current && ytPlayerRef.current) {
      try {
        const ct = ytPlayerRef.current.getCurrentTime?.() || 0;
        if (ct > 3) {
          ytPlayerRef.current.seekTo(0, true);
          dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });
          dispatch({ type: 'SET_PROGRESS', payload: 0 });
        } else {
          ytPlayerRef.current.previousVideo();
        }
      } catch { /* ignore */ }
      return;
    }
    const audio = audioRef.current;
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
      const clampedPercent = Math.max(0, Math.min(100, progressPercent));

      // YouTube mode
      if (isYtMode.current && ytPlayerRef.current?.seekTo && ytPlayerRef.current?.getDuration) {
        try {
          const dur = ytPlayerRef.current.getDuration();
          const targetTime = (clampedPercent / 100) * dur;
          ytPlayerRef.current.seekTo(targetTime, true);
          dispatch({ type: 'SET_CURRENT_TIME', payload: targetTime });
          dispatch({ type: 'SET_PROGRESS', payload: clampedPercent });
        } catch { /* ignore */ }
        return;
      }

      // Non-YT mode
      const audio = audioRef.current;
      const dur = (audio && audio.duration) || state.duration || 0;
      const targetTime = (clampedPercent / 100) * dur;
      simTimeRef.current = targetTime;
      if (audio && !isNaN(targetTime) && state.currentSong?.audioUrl !== '#') {
        audio.currentTime = targetTime;
      }
      dispatch({ type: 'SET_CURRENT_TIME', payload: targetTime });
      dispatch({ type: 'SET_PROGRESS', payload: clampedPercent });
    },
    [state.duration, state.currentSong]
  );

  const seekTime = useCallback(
    (seconds: number) => {
      if (isYtMode.current && ytPlayerRef.current?.seekTo) {
        try { ytPlayerRef.current.seekTo(seconds, true); } catch { /* ignore */ }
        dispatch({ type: 'SET_CURRENT_TIME', payload: seconds });
        return;
      }
      const audio = audioRef.current;
      const dur = (audio && audio.duration) || state.duration || 0;
      const clampedTime = Math.max(0, Math.min(dur, seconds));
      const progress = dur > 0 ? (clampedTime / dur) * 100 : 0;
      if (audio && !isNaN(clampedTime)) audio.currentTime = clampedTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: clampedTime });
      dispatch({ type: 'SET_PROGRESS', payload: progress });
    },
    [state.duration]
  );

  const toggleLike = useCallback((songId?: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: songId });
  }, []);

  const isSongLiked = useCallback(
    (songId: string) => state.likedSongIds.includes(songId),
    [state.likedSongIds]
  );

  const toggleShuffle = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
    if (isYtMode.current && ytPlayerRef.current?.setShuffle) {
      try { ytPlayerRef.current.setShuffle(!state.isShuffled); } catch { /* ignore */ }
    }
  }, [state.isShuffled]);

  const toggleRepeat = useCallback(() => {
    dispatch({ type: 'TOGGLE_REPEAT' });
  }, []);

  const addToQueue = useCallback((song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: song });
  }, []);

  const setQueue = useCallback((songs: Song[]) => {
    dispatch({ type: 'SET_QUEUE', payload: songs });
  }, []);

  const playPlaylist = useCallback((songs: Song[], startIndex: number = 0, youtubePlaylistId?: string, autoPlay: boolean = true) => {
    // Synchronously update refs so handleYtStateChange sees the new queue immediately
    queueRef.current = songs;
    currentSongRef.current = songs[startIndex] || null;

    dispatch({ type: 'PLAY_PLAYLIST', payload: { songs, startIndex, autoPlay } });

    if (youtubePlaylistId) {
      isYtMode.current = true;
      ytPlaylistIdRef.current = youtubePlaylistId;

      // Bump generation counter so stale PLAYING events from the old playlist are ignored
      const thisGen = playlistGenRef.current + 1;
      playlistGenRef.current = thisGen;
      expectedGenRef.current = thisGen;
      pendingStartIndexRef.current = startIndex;
      awaitingFirstPlayRef.current = true;

      const tryLoad = () => {
        const yt = ytPlayerRef.current;
        if (yt?.loadPlaylist || yt?.cuePlaylist) {
          try {
            const videoIds = songs.map((s) => s.id).filter((id) => id && id !== '#');
            if (videoIds.length > 0) {
              if (autoPlay) {
                yt.loadPlaylist({
                  playlist: videoIds,
                  index: startIndex,
                });
              } else {
                if (yt.cuePlaylist) {
                  yt.cuePlaylist({
                    playlist: videoIds,
                    index: startIndex,
                  });
                } else {
                  yt.loadPlaylist({
                    playlist: videoIds,
                    index: startIndex,
                  });
                  yt.pauseVideo?.();
                }
              }
            } else if (youtubePlaylistId) {
              if (autoPlay) {
                yt.loadPlaylist({
                  list: youtubePlaylistId,
                  listType: 'playlist',
                  index: startIndex,
                });
              } else {
                yt.cuePlaylist?.({
                  list: youtubePlaylistId,
                  listType: 'playlist',
                  index: startIndex,
                });
              }
            }
            // Set volume to match our state
            setTimeout(() => {
              try { yt.setVolume(state.volume * 100); } catch { /* ignore */ }
            }, 500);
          } catch (e) {
            console.warn('YT loadPlaylist error:', e);
            isYtMode.current = false;
          }
        } else {
          // API not ready yet, retry
          setTimeout(tryLoad, 500);
        }
      };
      tryLoad();
    } else {
      // Non-YouTube playlist (e.g. Spotify) → simulated playback
      isYtMode.current = false;
      ytPlaylistIdRef.current = null;
      // Stop YouTube if it was playing
      if (ytPlayerRef.current?.stopVideo) {
        try { ytPlayerRef.current.stopVideo(); } catch { /* ignore */ }
      }
    }
  }, [state.volume]);

  // ────────────────────────────────────────────────────────────
  // Context value
  // ────────────────────────────────────────────────────────────

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
      {/* Hidden YouTube player — must exist in DOM for IFrame API */}
      <div
        id="bhakti-yt-player"
        style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
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
