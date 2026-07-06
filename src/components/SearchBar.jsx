export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by lead or business name…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
