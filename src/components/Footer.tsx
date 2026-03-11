import React from 'react';
export function Footer() {
  return (
    <footer className="py-7 pb-10 text-obs-muted text-[0.95rem]">
      <div className="w-full max-w-[1240px] mx-auto px-4">
        <p className="m-0 mb-3">
          ACAT Observatory — Built by{' '}
          <a
            href="https://humanaios.ai"
            className="text-accent-amber no-underline hover:underline">

            HumanAIOS
          </a>{' '}
          • Research prototype demonstrating AI calibration gap • arXiv preprint
          submitted March 10, 2026
        </p>
        <p className="m-0 text-[0.88rem]">
          For partnership inquiries:{' '}
          <a
            href="mailto:research@humanaios.ai"
            className="text-accent-amber no-underline hover:underline">

            research@humanaios.ai
          </a>{' '}
          •{' '}
          <a
            href="https://humanaios.ai"
            className="text-accent-amber no-underline hover:underline">

            Full ACAT assessment tool
          </a>{' '}
          •{' '}
          <a
            href="https://github.com/humanaios-ui/lasting-light-ai"
            className="text-accent-amber no-underline hover:underline">

            GitHub repository
          </a>
        </p>
      </div>
    </footer>);

}