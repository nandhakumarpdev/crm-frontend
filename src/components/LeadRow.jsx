import { formatDate } from '../utils/dateFormatter';
import { formatBudget } from '../utils/currencyFormatter';
import { stageClass, priorityClass } from '../utils/stageStyles';

export default function LeadRow({ lead, onEdit, onDelete }) {
  return (
    <tr>
      <td className="cell-primary">{lead.lead_name}</td>
      <td>{lead.business_name}</td>
      <td>{lead.service || '—'}</td>
      <td>{lead.city || '—'}</td>
      <td>{formatBudget(lead.budget)}</td>
      <td>
        <span className={`stage-badge ${stageClass(lead.stage)}`}>{lead.stage}</span>
      </td>
      <td className="cell-muted">{lead.owner || '—'}</td>
      <td>
        {lead.priority ? (
          <span className={`priority-badge ${priorityClass(lead.priority)}`}>
            {lead.priority}
          </span>
        ) : (
          <span className="cell-muted">—</span>
        )}
      </td>
      <td className="cell-muted">{lead.lead_source || '—'}</td>
      <td className="cell-muted">{formatDate(lead.updated_at)}</td>
      <td>
        <div className="actions-cell">
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(lead)}>
            Edit
          </button>
          <button
            className="btn btn-secondary btn-sm btn-icon-danger"
            onClick={() => onDelete(lead)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
