'use client';

import { useState } from 'react';
import { ArrowRight, Copy, Shuffle } from 'lucide-react';
import { Notice } from './shared';
import styles from './studio.module.css';

const genres = {
  'Electronic': ['Signal', 'Circuit', 'Frequency', 'Current', 'Static', 'Voltage', 'Afterimage', 'Transmission'],
  'Hip-hop': ['Corner', 'City', 'Block', 'Tape', 'Verse', 'Avenue', 'Streetlight', 'Cadence'],
  'Lo-fi': ['Window', 'Café', 'Rain', 'Cassette', 'Notebook', 'Room', 'Dusk', 'Sunday'],
  'Pop': ['Heartbeat', 'Midnight', 'Replay', 'Daybreak', 'Glow', 'Orbit', 'Radio', 'Echo'],
  'Indie': ['Garden', 'Coastline', 'Station', 'Porch', 'Polaroid', 'Skyline', 'Bedroom', 'Blue Hour'],
  'Ambient': ['Horizon', 'Drift', 'Mist', 'Silence', 'Tide', 'Ember', 'Distance', 'Waterline'],
};

const moods = {
  'Dreamy': ['Soft', 'Lucid', 'Weightless', 'Velvet', 'Clouded', 'Floating', 'Faded', 'Silver'],
  'Upbeat': ['Bright', 'Electric', 'Golden', 'Wide Awake', 'Sunday', 'Blooming', 'Open', 'Alive'],
  'Reflective': ['Quiet', 'Slow', 'Dear', 'Last', 'Hushed', 'Familiar', 'Distant', 'Still'],
  'Dark': ['Hollow', 'Obsidian', 'Broken', 'Restless', 'Blackout', 'Hidden', 'Heavy', 'Nocturnal'],
  'Cinematic': ['Parallel', 'Everlasting', 'Northern', 'Wild', 'Distant', 'Open', 'Flickering', 'Infinite'],
};

function pick<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function ideas(genre: keyof typeof genres, mood: keyof typeof moods, kind: string, keywords: string) {
  const suggestions = new Set<string>();
  const tokens = keywords.split(/[,;]+/).map(word => word.trim())
    .filter(Boolean).slice(0, 4).map(word => word[0].toUpperCase() + word.slice(1));
  const nouns = genres[genre];
  const adjectives = moods[mood];
  for (let i = 0; i < 70 && suggestions.size < 6; i++) {
    const noun = tokens.length > 0 && suggestions.size % 2 === 0 ? pick(tokens) : pick(nouns);
    const adjective = pick(adjectives);
    const patterns = kind === 'track'
      ? [adjective + ' ' + noun, noun + ' at Midnight', 'Back to ' + noun, noun + ' in Motion']
      : ['Notes from ' + noun, adjective + ' ' + noun, 'The ' + noun + ' Sessions', noun + ' After Dark'];
    suggestions.add(pick(patterns));
  }
  return [...suggestions];
}

export default function NameGenerator({ title, onTitle, onCover }: {
  title: string;
  onTitle: (title: string) => void;
  onCover: () => void;
}) {
  const [genre, setGenre] = useState<keyof typeof genres>('Electronic');
  const [mood, setMood] = useState<keyof typeof moods>('Dreamy');
  const [kind, setKind] = useState('track');
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  return (
    <div className={styles.panelGrid}>
      <div className={styles.stack}>
        <form className={styles.track} onSubmit={event => {
          event.preventDefault();
          setSuggestions(ideas(genre, mood, kind, keywords));
          setFeedback('');
        }}>
          <h3>Generate title ideas</h3>
          <div className={styles.fieldRow}>
            <label>Genre<select value={genre} onChange={event => setGenre(event.target.value as keyof typeof genres)}>
              {Object.keys(genres).map(value => <option key={value}>{value}</option>)}
            </select></label>
            <label>Mood<select value={mood} onChange={event => setMood(event.target.value as keyof typeof moods)}>
              {Object.keys(moods).map(value => <option key={value}>{value}</option>)}
            </select></label>
            <label>Release type<select value={kind} onChange={event => setKind(event.target.value)}>
              <option value="track">Track</option><option value="release">Album or EP</option>
            </select></label>
          </div>
          <label>Keywords <span className={styles.optional}>Optional</span><input maxLength={80} value={keywords}
            onChange={event => setKeywords(event.target.value)} placeholder="Night train, paper moon" /></label>
          <div className={styles.actions}><button className={styles.primary}><Shuffle size={16} /> Generate titles</button></div>
        </form>
        {suggestions.length > 0 && <ul className={styles.suggestions} aria-label="Generated title ideas">
          {suggestions.map(suggestion => <li key={suggestion}>
            <strong>{suggestion}</strong>
            <button className={styles.secondary} onClick={() => { onTitle(suggestion); setFeedback('Applied “' + suggestion + '”.'); }}>Use title</button>
          </li>)}
        </ul>}
        {feedback && <Notice>{feedback}</Notice>}
      </div>
      <aside className={styles.settings}>
        <h3>Selected title</h3>
        <label>Edit your title<input value={title} maxLength={80} placeholder="Untitled" onChange={event => onTitle(event.target.value)} /></label>
        <p className={styles.muted}>This title is used for the master filename and cover art.</p>
        <button className={styles.secondary} disabled={!title.trim()} onClick={() => {
          void navigator.clipboard.writeText(title).then(() => setFeedback('Title copied.'), () => setFeedback('Select and copy the title from the text field.'));
        }}><Copy size={16} /> Copy title</button>
        <button className={styles.primary} disabled={!title.trim()} onClick={onCover}>Open cover generator <ArrowRight size={16} /></button>
      </aside>
    </div>
  );
}
