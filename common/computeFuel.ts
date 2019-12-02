export default function computeFuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}
