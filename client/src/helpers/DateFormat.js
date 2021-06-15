export default function DateFormat(t) {
  const a = [{ day: '2-digit' }, { month: '2-digit' }, { year: 'numeric' }];
  function format(m) {
    const f = new Intl.DateTimeFormat('default', m);
    return f.format(typeof t === 'string' ? new Date(t) : t);
  }
  if (t) {
    return a.map(format).join('.');
  }
}
