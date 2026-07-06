import LeadRow from './LeadRow';
import EmptyState from './EmptyState';
import Loader from './Loader';

export default function LeadTable({ leads, loading, hasFilters, onEdit, onDelete }) {
  if (loading) return <Loader />;
  if (!leads.length) return <EmptyState hasFilters={hasFilters} />;

  return (
    <div className="table-card">
      <div className="table-scroll">
        <table className="lead-table">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Business Name</th>
              <th>Service</th>
              <th>City</th>
              <th>Budget</th>
              <th>Stage</th>
              <th>Owner</th>
              <th>Priority</th>
              <th>Lead Source</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
