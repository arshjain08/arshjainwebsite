export default function ThemeBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle_at_18%_24%,var(--ink)_0_0.7px,transparent_1px),radial-gradient(circle_at_76%_18%,var(--ink)_0_0.8px,transparent_1.1px),radial-gradient(circle_at_64%_72%,var(--ink)_0_0.6px,transparent_1px),radial-gradient(circle_at_28%_82%,var(--ink)_0_0.75px,transparent_1px)] [background-size:137px_137px,193px_193px,157px_157px,223px_223px]" />
      <div className="absolute -right-[22rem] top-[12vh] h-[48rem] w-[48rem] rounded-full border border-[var(--line)] opacity-35" />
      <div className="absolute -right-[12rem] top-[22vh] h-[28rem] w-[28rem] rounded-full border border-[var(--line)] opacity-20" />
      <svg
        viewBox="0 0 160 160"
        className="rocket-drift absolute right-[8vw] top-[31vh] hidden w-32 rotate-[8deg] text-[var(--ink)] opacity-80 md:block lg:right-[10vw] lg:w-40"
      >
        <path d="M57 105C68 76 85 50 112 31c5 29-4 58-28 81L57 105Z" fill="var(--paper-deep)" stroke="var(--accent)" strokeWidth="2" />
        <path d="M63 91 43 94l-10 24 25-11" fill="var(--paper-deep)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m80 109-2 23 21-14-5-18" fill="var(--paper-deep)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="89" cy="64" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="89" cy="64" r="3" fill="var(--accent)" opacity="0.8" />
        <path d="M54 109c-8 8-14 16-18 25 9-4 17-10 24-18M48 106c-7 3-13 8-18 14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="m122 43 2.5 5 5.5 2.5-5.5 2.5-2.5 5-2.5-5-5.5-2.5 5.5-2.5 2.5-5ZM42 54l1.5 3.5L47 59l-3.5 1.5L42 64l-1.5-3.5L37 59l3.5-1.5L42 54Z" fill="var(--ink)" opacity="0.7" />
      </svg>
      <div className="absolute left-[7vw] top-[28vh] h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
      <div className="absolute bottom-[18vh] right-[18vw] h-1.5 w-1.5 rounded-full bg-[var(--ink)] shadow-[0_0_14px_var(--ink)] opacity-70" />
    </div>
  );
}
