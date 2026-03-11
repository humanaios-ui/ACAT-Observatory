import React from 'react';
export function TopBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-obs-bg/90 border-b border-obs-line">
      <div className="w-full max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 py-3.5">
        <a
          className="flex items-center gap-3 text-obs-text no-underline min-w-0 group"
          href="https://humanaios.ai">

          <div className="w-10 h-10 rounded-full grid place-items-center border border-obs-line-strong bg-gradient-to-br from-accent-amber/20 to-accent-amber/5 text-accent-amber font-bold shadow-[inset_0_0_24px_rgba(212,160,74,0.08)] flex-none group-hover:border-accent-amber transition-colors">
            ◌
          </div>
          <div>
            <strong className="block text-base tracking-wide font-sans">
              ACAT Observatory
            </strong>
            <span className="block text-obs-muted text-sm font-sans">
              Research prototype • HumanAIOS
            </span>
          </div>
        </a>
        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap gap-2 justify-start md:justify-end">

          <NavLink href="#signal">Core Signal</NavLink>
          <NavLink href="#dimensions">Dimensions</NavLink>
          <NavLink href="#feed">Sample Data</NavLink>
          <NavLink href="https://humanaios.ai">Home</NavLink>
        </nav>
      </div>
    </header>);

}
function NavLink({
  href,
  children



}: {href: string;children: React.ReactNode;}) {
  return (
    <a
      href={href}
      className="text-obs-muted no-underline px-3 py-2 rounded-full border border-transparent transition-all duration-200 text-sm hover:text-obs-text hover:bg-accent-amber/10 hover:border-obs-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber-bright focus-visible:ring-offset-2 focus-visible:ring-offset-obs-bg">

      {children}
    </a>);

}