const STAGES = [
  'All',
  'New',
  'Contacted',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

export default function StageFilter({ value, onChange }) {
  return (
    <select
      className="select-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by stage"
    >
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {s === 'All' ? 'All stages' : s}
        </option>
      ))}
    </select>
  );
}

export { STAGES };
