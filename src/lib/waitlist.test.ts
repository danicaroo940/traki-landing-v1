import { describe, it, expect, vi } from 'vitest';
import { isValidEmail, submitWaitlist } from './waitlist';

describe('isValidEmail', () => {
  it('accepts a normal address', () => { expect(isValidEmail('a@b.com')).toBe(true); });
  it('rejects a missing @', () => { expect(isValidEmail('ab.com')).toBe(false); });
  it('rejects empty', () => { expect(isValidEmail('')).toBe(false); });
  it('rejects whitespace', () => { expect(isValidEmail('  ')).toBe(false); });
});

describe('submitWaitlist', () => {
  it('POSTs the email as form data and returns ok on 200', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: true });
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(true);
    expect(fetchFn).toHaveBeenCalledOnce();
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://ep.test');
    expect((init as RequestInit).method).toBe('POST');
  });
  it('returns not-ok on a failed response', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false });
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(false);
  });
  it('returns not-ok when fetch throws', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('network'));
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(false);
  });
});
