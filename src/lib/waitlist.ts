export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length === 0) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export async function submitWaitlist(
  endpoint: string,
  email: string,
  fetchFn: typeof fetch = fetch,
): Promise<{ ok: boolean }> {
  try {
    const body = new FormData();
    body.append('email', email.trim());
    const res = await fetchFn(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
