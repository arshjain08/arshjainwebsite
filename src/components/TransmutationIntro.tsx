'use client';

import { useEffect, useId, useRef } from 'react';
import styles from './TransmutationIntro.module.css';

const sessionKey = 'arsh-arrival-seen';
const symbols = [
  { angle: 0, mark: 'M-8 5 0-9 8 5Z' },
  { angle: 60, mark: 'M-8-5 0 9 8-5Z M-9 0H9' },
  { angle: 120, mark: 'M-8-5 0 9 8-5Z' },
  { angle: 180, mark: 'M-7-7H7V7H-7Z M0-11V11' },
  { angle: 240, mark: 'M-8 5 0-9 8 5Z M-9 0H9' },
  { angle: 300, mark: 'M0-10V10 M-10 0H10 M-6-6 6 6 M-6 6 6-6' },
];

export default function TransmutationIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textureId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const replay = new URLSearchParams(window.location.search).get('intro') === 'replay';
    if (!dialog || reducedMotion.matches || typeof dialog.showModal !== 'function') return;

    try {
      if (!replay && window.sessionStorage.getItem(sessionKey)) return;
    } catch {}

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousFocus = document.activeElement;
    let timeout: number | undefined;
    let started = false;

    const finish = () => {
      if (!started) return;
      started = false;
      window.clearTimeout(timeout);
      dialog.close();
      root.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) finish();
    };

    const frame = window.requestAnimationFrame(() => {
      if (reducedMotion.matches) return;
      started = true;
      dialog.showModal();
      dialog.focus({ preventScroll: true });
      root.style.overflow = 'hidden';
      try {
        window.sessionStorage.setItem(sessionKey, 'true');
      } catch {}
      timeout = window.setTimeout(finish, 3600);
    });

    dialog.addEventListener('close', finish);
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frame);
      finish();
      dialog.removeEventListener('close', finish);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.intro}
      aria-label="Transmutation circle opening animation"
      tabIndex={-1}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className={styles.halo} aria-hidden="true" />
      <svg className={styles.circle} viewBox="0 0 640 640" fill="none" aria-hidden="true">
        <defs>
          <filter id={textureId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.64" numOctaves="3" seed="8" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g className={styles.activate}>
          <g filter={`url(#${textureId})`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <g className={styles.outline}>
              <path pathLength="1" d="M320 80A240 240 0 0 1 320 560" />
              <path pathLength="1" d="M320 560A240 240 0 0 1 320 80" />
            </g>
            <g className={styles.innerRing}>
              <path pathLength="1" d="M320 98A222 222 0 0 0 320 542" />
              <path pathLength="1" d="M320 542A222 222 0 0 0 320 98" />
            </g>
            <g className={styles.geometry}>
              <path pathLength="1" d="M320 126 488 417H152Z" />
              <path pathLength="1" d="M320 514 152 223H488Z" />
            </g>
            <g className={styles.core}>
              <circle pathLength="1" cx="320" cy="320" r="97" />
              <circle pathLength="1" cx="320" cy="320" r="83" />
              <path pathLength="1" d="M320 252 388 320 320 388 252 320Z" />
              <path pathLength="1" d="M272 272H368V368H272Z" />
            </g>
            <g className={styles.inscriptions}>
              {symbols.map(({ angle, mark }) => (
                <g key={angle} transform={`rotate(${angle} 320 320)`}>
                  <path pathLength="1" d="M320 86V92 M312 87V91 M328 87V91" />
                  <g transform="translate(320 126)">
                    <circle pathLength="1" r="19" className={styles.node} />
                    <path pathLength="1" d={mark} />
                  </g>
                  <path pathLength="1" d="M308 192 320 180 332 192 320 204Z M320 211V217" />
                </g>
              ))}
            </g>
            <g className={styles.center}>
              <circle pathLength="1" cx="320" cy="320" r="18" />
              <path pathLength="1" d="M320 293V347 M293 320H347" />
            </g>
          </g>
        </g>
      </svg>
      <button className={styles.skip} onClick={() => dialogRef.current?.close()}>
        skip intro <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
