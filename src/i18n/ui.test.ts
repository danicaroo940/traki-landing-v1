import { describe, it, expect } from 'vitest';
import { useTranslations, oppositeLang, ui } from './ui';

describe('useTranslations', () => {
  it('returns the string for a known key in Spanish', () => {
    const t = useTranslations('es');
    expect(t('nav.cta')).toBe('Únete');
  });
  it('returns the string for a known key in English', () => {
    const t = useTranslations('en');
    expect(t('nav.cta')).toBe('Join');
  });
  it('falls back to the key when missing', () => {
    const t = useTranslations('es');
    expect(t('does.not.exist')).toBe('does.not.exist');
  });
});

describe('oppositeLang', () => {
  it('maps es to en and en to es', () => {
    expect(oppositeLang('es')).toBe('en');
    expect(oppositeLang('en')).toBe('es');
  });
});

describe('ui parity', () => {
  it('has the same keys in every locale', () => {
    const esKeys = Object.keys(ui.es).sort();
    const enKeys = Object.keys(ui.en).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
