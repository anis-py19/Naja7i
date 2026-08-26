import React from 'react';

/**
 * 🎨 Formats inline text: **bold**, *bold/italic*, `code`
 */
export function formatInlineText(text) {
  if (!text) return '';

  // Regex splitting by bold (**...**), single asterisk (*...*), or code (`...`)
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return tokens.map((token, idx) => {
    if (!token) return null;

    // Double asterisk **bold**
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={idx} className="font-black text-[#0F172A]">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Single asterisk *bold/italic*
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <strong key={idx} className="font-bold text-[#0F172A]">
          {token.slice(1, -1)}
        </strong>
      );
    }

    // Inline code `code`
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[#E11D48] font-mono text-[11px] border border-slate-200">
          {token.slice(1, -1)}
        </code>
      );
    }

    return token;
  });
}

/**
 * 📑 Full Markdown-to-JSX Block Parser & Ultra-Clean Table Renderer
 */
export default function MarkdownContentRenderer({ content }) {
  if (!content) return null;

  // Filter out any trailing json blocks if present
  const cleanedContent = content.replace(/```json[\s\S]*?```/g, '').trim();

  // Split lines into structured blocks (Paragraphs, Headings, Tables, Lists, Callouts)
  const lines = cleanedContent.split('\n');
  const blocks = [];
  let currentTable = null;
  let currentCodeBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (currentTable) {
        blocks.push({ type: 'table', rows: currentTable });
        currentTable = null;
      }
      continue;
    }

    // Code blocks ```
    if (trimmed.startsWith('```')) {
      if (currentCodeBlock) {
        blocks.push({ type: 'code', lines: currentCodeBlock });
        currentCodeBlock = null;
      } else {
        currentCodeBlock = [];
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.push(rawLine);
      continue;
    }

    // Table rows (| col1 | col2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.includes('---')) {
        // Separator row, skip
        continue;
      }
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map(c => c.trim());

      if (!currentTable) {
        currentTable = [cells];
      } else {
        currentTable.push(cells);
      }
      continue;
    } else if (currentTable) {
      blocks.push({ type: 'table', rows: currentTable });
      currentTable = null;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.replace('# ', '') });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.replace('## ', '') });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.replace('### ', '') });
    }
    // Callouts (> Note)
    else if (trimmed.startsWith('> ')) {
      blocks.push({ type: 'callout', text: trimmed.replace(/^>\s*/, '') });
    }
    // Tree diagram lines (├── └──)
    else if (trimmed.includes('├──') || trimmed.includes('└──') || (trimmed.includes('│') && trimmed.includes('─'))) {
      blocks.push({ type: 'tree', text: trimmed });
    }
    // Bullet list (- • *)
    else if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || (trimmed.startsWith('* ') && !trimmed.endsWith('*'))) {
      blocks.push({ type: 'bullet', text: trimmed.replace(/^[-•*]\s*/, '') });
    }
    // Numbered list (1. 2.)
    else if (trimmed.match(/^\d+[\.\-\)]/)) {
      const num = trimmed.match(/^\d+/)?.[0] || '1';
      blocks.push({ type: 'numbered', num, text: trimmed.replace(/^\d+[\.\-\)]\s*/, '') });
    }
    // Standard Paragraph
    else {
      blocks.push({ type: 'p', text: trimmed });
    }
  }

  // Flush any remaining table
  if (currentTable) {
    blocks.push({ type: 'table', rows: currentTable });
  }
  if (currentCodeBlock) {
    blocks.push({ type: 'code', lines: currentCodeBlock });
  }

  return (
    <div className="space-y-4 text-[#0F172A] leading-relaxed font-['Cairo'] text-right" dir="rtl">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1 key={idx} className="text-lg sm:text-xl font-black text-[#E11D48] border-b-2 border-rose-100 pb-3 mt-6 mb-3 flex items-center gap-2">
                <span>{formatInlineText(block.text)}</span>
              </h1>
            );

          case 'h2':
            return (
              <h2 key={idx} className="text-sm sm:text-base font-black text-[#0F172A] mt-6 mb-2 pb-1.5 border-b border-slate-100 flex items-center gap-2.5">
                <span className="w-2.5 h-4.5 bg-[#E11D48] rounded-xs shrink-0"></span>
                <span>{formatInlineText(block.text)}</span>
              </h2>
            );

          case 'h3':
            return (
              <h3 key={idx} className="text-xs sm:text-sm font-bold text-slate-800 mt-4 mb-1.5">
                {formatInlineText(block.text)}
              </h3>
            );

          case 'table': {
            if (!block.rows || block.rows.length === 0) return null;
            const headerRow = block.rows[0];
            const dataRows = block.rows.slice(1);

            return (
              <div key={idx} className="my-5 overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/90 text-[#0F172A] border-b border-[#E2E8F0]">
                        {headerRow.map((col, cIdx) => (
                          <th 
                            key={cIdx} 
                            className="py-3 px-4 font-black tracking-wide whitespace-nowrap bg-slate-50/50 text-[#0F172A]"
                          >
                            {formatInlineText(col)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {dataRows.map((row, rIdx) => (
                        <tr 
                          key={rIdx} 
                          className="hover:bg-rose-50/30 transition-colors even:bg-slate-50/40"
                        >
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx} 
                              className="py-3 px-4 text-[#334155] leading-relaxed align-top font-medium"
                            >
                              {formatInlineText(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          case 'bullet':
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155] my-1.5 pr-1">
                <span className="w-2 h-2 rounded-full bg-[#E11D48] mt-2 shrink-0"></span>
                <span className="leading-relaxed flex-1">
                  {formatInlineText(block.text)}
                </span>
              </div>
            );

          case 'numbered':
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155] my-2 pr-1">
                <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-[#E11D48] font-bold text-[11px] shrink-0 border border-rose-200 mt-0.5">
                  {block.num}
                </span>
                <span className="leading-relaxed flex-1">
                  {formatInlineText(block.text)}
                </span>
              </div>
            );

          case 'callout':
            return (
              <div key={idx} className="p-4 rounded-2xl bg-rose-50/90 border-r-4 border-r-[#E11D48] border border-rose-200 text-rose-950 text-xs sm:text-sm leading-relaxed my-3 font-medium shadow-xs">
                {formatInlineText(block.text)}
              </div>
            );

          case 'tree':
            return (
              <div key={idx} className="p-2 px-3.5 rounded-xl bg-[#0F172A] text-emerald-300 font-mono text-xs my-1.5 font-bold overflow-x-auto whitespace-pre">
                {block.text}
              </div>
            );

          case 'code':
            return (
              <pre key={idx} className="p-3.5 rounded-xl bg-[#0F172A] text-slate-100 font-mono text-xs my-2 overflow-x-auto text-left" dir="ltr">
                <code>{block.lines.join('\n')}</code>
              </pre>
            );

          case 'p':
          default:
            return (
              <p key={idx} className="text-xs sm:text-sm text-[#475569] leading-relaxed my-1.5">
                {formatInlineText(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
