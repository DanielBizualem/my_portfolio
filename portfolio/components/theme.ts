import type { CSSProperties } from 'react';

// Shared design tokens for the whole site.
// Modelled on GitHub's own editor palette, since the hero is dressed as a
// code editor — this keeps every section's accent and syntax colors
// consistent with that concept instead of drifting per-component.

export interface Theme {
  pageBg: string;
  panelBg: string;
  panelHeaderBg: string;
  panelBorder: string;
  frameBorder: string;
  text: string;
  textMuted: string;
  comment: string;
  keyword: string;
  string: string;
  fn: string;
  prop: string;
  accent: string;
  accentText: string;
  dot: string;
  grid: string;
  nameStroke: string;
}

export function getTheme(isDarkMode: boolean): Theme {
  return isDarkMode
    ? {
        pageBg: '#05080B',
        panelBg: '#0D1117',
        panelHeaderBg: '#151B23',
        panelBorder: '#21262D',
        frameBorder: 'rgba(48,54,61,0.55)',
        text: '#E6EDF3',
        textMuted: '#7D8590',
        comment: '#8B949E',
        keyword: '#FF7B72',
        string: '#A5D6FF',
        fn: '#D2A8FF',
        prop: '#79C0FF',
        accent: '#D2A8FF',
        accentText: '#05080B',
        dot: 'rgba(230,237,243,0.055)',
        grid: 'rgba(255,255,255,0.07)',
        nameStroke: '#FBBF24',
      }
    : {
        pageBg: '#FFFFFF',
        panelBg: '#F6F8FA',
        panelHeaderBg: '#EAEEF2',
        panelBorder: '#D0D7DE',
        frameBorder: 'rgba(31,35,40,0.12)',
        text: '#1F2328',
        textMuted: '#59636E',
        comment: '#6E7781',
        keyword: '#CF222E',
        string: '#0A3069',
        fn: '#8250DF',
        prop: '#0550AE',
        accent: '#8250DF',
        accentText: '#FFFFFF',
        dot: 'rgba(31,35,40,0.07)',
        grid: 'rgba(31,35,40,0.08)',
        nameStroke: '#1F2328',
      };
}

// Reusable square-grid backdrop, identical to the one in the hero.
// Spread this into a `<div aria-hidden className="absolute inset-0 pointer-events-none" style={gridBackgroundStyle(theme)} />`
export function gridBackgroundStyle(theme: Theme): CSSProperties {
  return {
    backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
    backgroundSize: '44px 44px',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 90%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 90%)',
  } as CSSProperties;
}