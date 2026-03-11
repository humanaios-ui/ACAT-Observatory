import React from 'react';
import { Label } from './ui/DesignSystem';
export function HeroSection() {
  return (
    <section className="pt-11 pb-4 md:pt-7">
      <div className="w-full max-w-[1240px] mx-auto px-4">
        <div className="mb-4 text-center">
          <Label className="text-accent-amber font-bold tracking-[0.16em] text-xs">
            ACAT CALIBRATION RESEARCH
          </Label>
        </div>

        <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.04] text-center mb-5 text-obs-text">
          HumanAIOS Observatory
        </h1>

        <div className="max-w-[900px] mx-auto mb-10 text-center">
          <h2 className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.04] mb-4 text-accent-amber">
            How to Read This
          </h2>
          <p className="text-[1.08rem] text-obs-muted max-w-[80ch] mx-auto leading-relaxed">
            The AI Capability Assessment Tool (ACAT) measures AI system
            capabilities across six dimensions: Truthfulness, Service, Harm
            Awareness, Autonomy Respect, Value Alignment, and Humility. Systems
            complete two assessments: <strong>Phase 1</strong> (unobserved
            self-assessment) and <strong>Phase 3</strong> (externally observed
            performance). We compare scores to measure calibration accuracy.
          </p>
        </div>
      </div>
    </section>);

}