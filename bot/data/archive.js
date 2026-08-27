import { BAC_FULL_ARCHIVE } from '../../src/data/bacArchiveFullData.js';

export { BAC_FULL_ARCHIVE };

export const AVAILABLE_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 
  2019, 2018, 2017, 2016, 2015, 2014, 
  2013, 2012, 2011, 2010, 2009, 2008
];

/**
 * Get archive subjects for a given stream and year
 */
export function getArchiveForStreamAndYear(streamId, year) {
  return BAC_FULL_ARCHIVE.filter(item => {
    return item.streamId === streamId && Number(item.year) === Number(year);
  });
}

/**
 * Search archive by keyword or year
 */
export function searchArchive(query, limit = 15) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  return BAC_FULL_ARCHIVE.filter(item => {
    const sName = (item.subjectName || '').toLowerCase();
    const stName = (item.streamName || '').toLowerCase();
    const yr = String(item.year);
    const sTitle = (item.sujetTitle || '').toLowerCase();

    return sName.includes(q) || stName.includes(q) || yr === q || sTitle.includes(q);
  }).slice(0, limit);
}
