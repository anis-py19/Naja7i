import { execSync } from 'child_process';

const out = execSync('git diff-tree --no-commit-id --name-only -r 1869458', { encoding: 'utf8' });
const files = out.trim().split('\n');
console.log(`Total files in commit: ${files.length}`);
const pdfs = files.filter(f => f.endsWith('.pdf'));
console.log(`Total PDFs in commit: ${pdfs.length}`);
console.log('Sample files:', files.slice(0, 10));
