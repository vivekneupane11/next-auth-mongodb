describe('example suite', () => {
  it('adds numbers', () => {
    expect(1 + 1).toBe(2);
  });

  it('string equality', () => {
    expect('ci').toBe('ci');
  });

  // Deliberately fails — remove or fix to unblock CI / merge on PR #4.
  it('fails on purpose for PR #4 demo', () => {
    expect(true).toBe(false);
  });
});
