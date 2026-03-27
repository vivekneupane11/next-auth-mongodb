describe('example suite', () => {
  it('passes', () => {
    expect(1 + 1).toBe(2);
  });

  // Intentional failure — fix or remove this case when you want `npm test` to pass in CI.
  it('fails deliberately', () => {
    expect(true).toBe(false);
  });
});
