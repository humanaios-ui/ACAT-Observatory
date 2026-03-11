import React from 'react';
interface ExplanatorySectionProps {
  title: string;
  paragraphs: string[];
}
export function ExplanatorySection({
  title,
  paragraphs
}: ExplanatorySectionProps) {
  return (
    <section className="py-4 md:py-3">
      <div className="w-full max-w-[1240px] mx-auto px-4">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.04] mb-4 text-obs-text">
            {title}
          </h2>
          {paragraphs.map((text, index) =>
          <p
            key={index}
            className={`text-obs-muted leading-[1.6] ${index === paragraphs.length - 1 ? 'm-0' : 'mb-3'}`}
            dangerouslySetInnerHTML={{
              __html: text
            }} />

          )}
        </div>
      </div>
    </section>);

}