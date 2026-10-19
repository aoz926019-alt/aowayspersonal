// Synthetic shipments for the interactive portfolio demo; not project records.
export const sampleShipments = [
  { id: "S01", route: "HK", actual: 4, promised: 5, cost: 1250 },
  { id: "S02", route: "HK", actual: 7, promised: 5, cost: 1600 },
  { id: "S03", route: "SG", actual: 5, promised: 6, cost: 1800 },
  { id: "S04", route: "SG", actual: 8, promised: 6, cost: 2100 },
  { id: "S05", route: "UK", actual: 10, promised: 12, cost: 3500 },
  { id: "S06", route: "UK", actual: 15, promised: 12, cost: 4100 },
  { id: "S07", route: "HK", actual: 5, promised: 5, cost: 1400 },
  { id: "S08", route: "SG", actual: 6, promised: 6, cost: 1950 },
  { id: "S09", route: "UK", actual: 11, promised: 12, cost: 3700 },
  { id: "S10", route: "HK", actual: 8, promised: 5, cost: 1700 },
  { id: "S03", route: "SG", actual: 5, promised: 6, cost: 1800 },
  { id: "S11", route: "UK", actual: null, promised: 12, cost: 3900 },
];

export const routes = { HK: "中国香港", SG: "新加坡", UK: "英国" };

export function validShipment(row) {
  return typeof row.id === "string" && row.id.length > 0 && Object.hasOwn(routes, row.route) &&
    Number.isFinite(row.actual) && row.actual >= 0 &&
    Number.isFinite(row.promised) && row.promised > 0 &&
    Number.isFinite(row.cost) && row.cost >= 0;
}

export function selectRows(rows, { clean = true, route = "all", lateOnly = false } = {}) {
  const seen = new Set();
  return rows.filter(row => {
    if (clean) {
      if (!validShipment(row) || seen.has(row.id)) return false;
      seen.add(row.id);
    }
    if (route !== "all" && row.route !== route) return false;
    return !lateOnly || (validShipment(row) && row.actual > row.promised);
  });
}

export function summarize(rows) {
  const valid = rows.filter(validShipment);
  const onTime = valid.filter(row => row.actual <= row.promised).length;
  return {
    count: rows.length,
    validCount: valid.length,
    onTime: valid.length ? onTime / valid.length : null,
    averageDays: valid.length ? valid.reduce((sum, row) => sum + row.actual, 0) / valid.length : null,
    byRoute: Object.entries(routes).map(([id, label]) => {
      const group = valid.filter(row => row.route === id);
      return { id, label, count: group.length, late: group.filter(row => row.actual > row.promised).length };
    }),
  };
}
