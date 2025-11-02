// Equirectangular projection utilities for placing pins on the map.
// x = (lon+180)/360 * width
// y = (90-lat)/180 * height
export function project(lat: number, lng: number, width: number, height: number) {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export function groupByYear<T extends { year: number }>(places: T[]) {
  const map = new Map<number, T[]>();
  for (const p of places) {
    if (!map.has(p.year)) map.set(p.year, []);
    map.get(p.year)!.push(p);
  }
  // Returns array of [year, items] pairs sorted desc by year
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export function stats(places: { visits: number; name?: string }[]) {
  const visited = places.length;
  const totalVisits = places.reduce((a, b) => a + (b.visits || 1), 0);
  const mostVisited = places.reduce(
    (max, p) => (p.visits > (max?.visits ?? 0) ? p : max),
    places[0]
  );
  return { visited, totalVisits, mostVisited };
}
