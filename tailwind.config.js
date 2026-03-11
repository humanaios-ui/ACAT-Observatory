
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        /* Design System */
        'accent-amber': 'var(--accent-amber)',
        'accent-amber-bright': 'var(--accent-amber-bright)',
        'accent-amber-dim': 'var(--accent-amber-dim)',
        'accent-ember': 'var(--accent-ember)',
        'accent-sage': 'var(--accent-sage)',
        'accent-blue': 'var(--accent-blue)',
        'pale-orange': 'var(--pale-orange)',
        'bg-primary': 'var(--bg-primary)',
        'muted-orange-2': 'var(--muted-orange-2)',
        
        /* Observatory Specific */
        'obs-bg': 'var(--bg)',
        'obs-bg-2': 'var(--bg-2)',
        'obs-panel': 'var(--panel)',
        'obs-panel-2': 'var(--panel-2)',
        'obs-text': 'var(--text)',
        'obs-muted': 'var(--muted)',
        'obs-line': 'var(--line)',
        'obs-line-strong': 'var(--line-strong)',
        'obs-danger': 'var(--danger)',
        'obs-success': 'var(--success)',
        'obs-blue': 'var(--blue)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'obs-panel': 'var(--shadow)',
      },
      borderRadius: {
        'obs': 'var(--radius)',
        'obs-sm': 'var(--radius-sm)',
      },
      backgroundImage: {
        'obs-panel-gradient': 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0))',
        'obs-callout-gradient': 'linear-gradient(180deg, rgba(212,160,74,.09), rgba(212,160,74,.03))',
      }
    }
  },
  plugins: [],
}
