'use client';

import {useState} from 'react';
import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react';
import {
  compareNicheRows, matchesNicheComparison, NICHE_COMPARISON_FILTERS, NICHE_SORT_COLUMNS,
  type NicheComparisonFilter, type NicheComparisonRow, type NicheSortKey,
} from '@/data/nicheComparison';
import styles from './NicheComparison.module.css';

const beginnerFit = {1: 'Advanced', 2: 'Intermediate', 3: 'Beginner-friendly'};

export default function NicheComparison({rows}: {rows: NicheComparisonRow[]}) {
  const [filter, setFilter] = useState<NicheComparisonFilter>('all');
  const [sort, setSort] = useState<{key: NicheSortKey; direction: 'ascending' | 'descending'}>();
  const visible = rows.filter(row => matchesNicheComparison(row, filter));
  if (sort) visible.sort((a, b) => {
    const result = compareNicheRows(a, b, sort.key);
    return sort.direction === 'ascending' ? result : -result;
  });

  function changeSort(key: NicheSortKey) {
    setSort(previous => ({key, direction: previous?.key === key && previous.direction === 'ascending' ? 'descending' : 'ascending'}));
  }

  return (
    <section className={styles.section} aria-labelledby="compare-niches">
      <h2 id="compare-niches" className="section-title">Compare niche playbooks</h2>
      <p id="comparison-explainer" className="muted">
        Use these planning estimates to choose a format for one starter video with a basic edit.
        Research, asset creation and revision can change the time required. Check the platform’s current disclosure rules for your finished video.
      </p>
      <div className="filter-row" role="group" aria-label="Filter comparison">
        {NICHE_COMPARISON_FILTERS.map(([key, label]) => (
          <button key={key} type="button" className="filter-chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {key === 'all' ? label + ' (' + rows.length + ')' : label}
          </button>
        ))}
      </div>
      <p className="muted small" role="status">{visible.length} of {rows.length} playbooks</p>
      <p className={styles.scrollHint} id="comparison-scroll-hint">Scroll sideways to see every column.</p>
      <div className={styles.scroll} role="region" aria-label="Niche comparison table"
        aria-describedby="comparison-scroll-hint" tabIndex={0}>
        <table className={styles.table} aria-describedby="comparison-explainer">
          <caption className="sr-only">Formats, effort, narration and production considerations across niche playbooks</caption>
          <thead>
            <tr>
              <th scope="col" className={styles.sticky}>Niche</th>
              {NICHE_SORT_COLUMNS.map(([key, label]) => {
                const direction = sort?.key === key ? sort.direction : undefined;
                const Indicator = direction === 'ascending' ? ArrowUp : direction === 'descending' ? ArrowDown : ArrowUpDown;
                return (
                  <th key={key} scope="col" aria-sort={direction}>
                    <button type="button" onClick={() => changeSort(key)}>
                      {label}<Indicator size={14} aria-hidden="true"/>
                    </button>
                  </th>
                );
              })}
              <th scope="col">Typical length</th>
              <th scope="col">Disclosure review</th>
              <th scope="col">Plan</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(row => (
              <tr key={row.slug}>
                <th scope="row" className={styles.sticky}>
                  <a href={'/niches/' + row.slug}>{row.name}</a>
                </th>
                <td>{row.primaryFormat}</td>
                <td>{row.estimatedEffort}</td>
                <td>{row.voiceoverType}</td>
                <td>{row.characterConsistencyNeed}</td>
                <td>{beginnerFit[row.beginnerFriendlyScore]}</td>
                <td>{row.typicalVideoLength}</td>
                <td>{row.policyDisclosureSensitivity}</td>
                <td><a href={'/studio?niche=' + row.slug} aria-label={'Plan ' + row.name + ' in Studio'}>Plan in Studio ↗</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
