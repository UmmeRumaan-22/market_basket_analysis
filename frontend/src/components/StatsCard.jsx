function StatsCard({
  title,
  value
}) {
  return (
    <div className="stats-card">
      <h5>{title}</h5>

      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;