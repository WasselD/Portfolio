const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export function formatMonthYear(value) {
  if (!value) return "";
  const s = String(value).trim();
  let y;
  let m;
  let hit = s.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
  if (hit) {
    y = +hit[1];
    m = +hit[2];
  } else if ((hit = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/))) {
    y = +hit[3];
    m = +hit[2];
  }
  if (!y || !m || m < 1 || m > 12) return s;
  return `${MONTHS[m - 1]} ${y}`;
}

export function yearOf(value) {
  const t = formatMonthYear(value);
  const hit = String(t).match(/(\d{4})/);
  return hit ? hit[1] : "";
}
