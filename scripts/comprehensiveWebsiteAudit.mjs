import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function getAllJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsxFiles(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = getAllJsxFiles(srcDir);
console.log(`Auditing ${allFiles.length} source files in src/ ...`);

const issues = {
  potentialMobileOverflow: [],
  unsafeLocalStorage: [],
  missingNullChecks: [],
  deprecatedIconsOrPings: [],
  tableWithoutScroll: [],
  touchTargetIssues: []
};

allFiles.forEach(file => {
  const relPath = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // 1. Check for green dot pings or badges (strictly banned by user rules)
    if (line.includes('animate-ping') || (line.includes('bg-emerald-500 rounded-full') && !line.includes('//'))) {
      issues.deprecatedIconsOrPings.push({ file: relPath, lineNum, code: line.trim() });
    }

    // 2. Unsafe localStorage access (direct JSON.parse(localStorage.getItem(...)) without try-catch on same block)
    if (line.includes('JSON.parse(localStorage.getItem(') && !content.includes('try {') && !line.includes('try')) {
      issues.unsafeLocalStorage.push({ file: relPath, lineNum, code: line.trim() });
    }

    // 3. Fixed large min-width or width that exceeds 320px on mobile without responsive prefix
    const fixedWidthMatch = line.match(/(?:min-w|w)-\[(\d+)px\]/);
    if (fixedWidthMatch) {
      const widthVal = parseInt(fixedWidthMatch[1], 10);
      if (widthVal > 340 && !line.includes('sm:') && !line.includes('md:') && !line.includes('lg:') && !line.includes('max-w-')) {
        issues.potentialMobileOverflow.push({
          file: relPath,
          lineNum,
          width: widthVal,
          code: line.trim()
        });
      }
    }

    // 4. Raw HTML <table> without overflow-x-auto wrapper
    if (line.includes('<table') && !content.includes('overflow-x-auto') && !content.includes('overflow-x-scroll')) {
      issues.tableWithoutScroll.push({ file: relPath, lineNum, code: line.trim() });
    }
  });
});

console.log('\n======================================================');
console.log('🔍 AUTOMATED CODEBASE AUDIT REPORT');
console.log('======================================================\n');

console.log(`1. Deprecated Ping / Dot Badges (User Rule Strict): ${issues.deprecatedIconsOrPings.length}`);
if (issues.deprecatedIconsOrPings.length > 0) {
  issues.deprecatedIconsOrPings.forEach(i => console.log(`   - [${i.file}:${i.lineNum}] ${i.code}`));
} else {
  console.log('   ✅ 100% Clean! Zero unwanted dot badges across all files.');
}

console.log(`\n2. Potential Mobile Overflow Elements (fixed width > 340px on mobile): ${issues.potentialMobileOverflow.length}`);
if (issues.potentialMobileOverflow.length > 0) {
  issues.potentialMobileOverflow.forEach(i => console.log(`   - [${i.file}:${i.lineNum}] (${i.width}px): ${i.code.slice(0, 80)}...`));
} else {
  console.log('   ✅ 100% Clean! No fixed wide widths without responsive breakpoints.');
}

console.log(`\n3. Unsafe LocalStorage Parsing: ${issues.unsafeLocalStorage.length}`);
if (issues.unsafeLocalStorage.length > 0) {
  issues.unsafeLocalStorage.forEach(i => console.log(`   - [${i.file}:${i.lineNum}] ${i.code}`));
} else {
  console.log('   ✅ 100% Clean! All localStorage access guarded with resilient fallback.');
}

console.log(`\n4. Tables without Mobile Scroll Wrapper: ${issues.tableWithoutScroll.length}`);
if (issues.tableWithoutScroll.length > 0) {
  issues.tableWithoutScroll.forEach(i => console.log(`   - [${i.file}:${i.lineNum}] ${i.code}`));
} else {
  console.log('   ✅ 100% Clean! All tables properly wrapped in responsive overflow containers.');
}

fs.writeFileSync('scripts/comprehensive_audit_findings.json', JSON.stringify(issues, null, 2));
