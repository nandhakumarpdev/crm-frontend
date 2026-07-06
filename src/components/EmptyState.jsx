export default function EmptyState({ hasFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h3>No leads found</h3>
      <p>
        {hasFilters
          ? 'Try clearing the search or switching the stage filter.'
          : 'Add your first lead to start tracking your pipeline.'}
      </p>
    </div>
  );
}
