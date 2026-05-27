export async function awardDiamonds(_userId: string, _amount: number): Promise<number> {
  // The BibleBuddy currency system has been retired. Keep this no-op shim so
  // older low-traffic code paths do not break while the remaining UI is removed.
  return 0;
}
