'use client';

import React from 'react';

/**
 * Renders a brand content title string.
 * - \n becomes <br />
 * - *text* becomes gold italic <em>
 */
export function BrandTitle({ title }: { title: string }) {
  const lines = title.split(/\n/);

  return (
    <>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx}>
          {lineIdx > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={i} className="text-p-gold font-accent italic font-light">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      ))}
    </>
  );
}

/**
 * Splits body text by \n\n into an array of paragraph strings.
 */
export function splitBodyParagraphs(body: string): string[] {
  return body.split(/\n\n+/).filter(p => p.trim().length > 0);
}
