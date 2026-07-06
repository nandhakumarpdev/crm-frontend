import { useState } from 'react';
import { toInputDate } from '../utils/dateFormatter';
import { STAGE_LIST } from '../utils/stageStyles';
import { SERVICES, PRIORITIES, SOURCES } from './LeadFormModal';

export default function EditLeadModal({ lead, onClose, onSubmit }) {
  const [form, setForm] = useState({
    lead_name: lead.lead_name || '',
    business_name: lead.business_name || '',
    service: lead.service || SERVICES[0],
    city: lead.city || '',
    budget: lead.budget ?? '',
    owner: lead.owner || '',
    priority: lead.priority || 'Medium',
    lead_source: lead.lead_source || SOURCES[0],
    stage: lead.stage || 'New',
    notes: lead.notes || '',
    follow_up_date: toInputDate(lead.follow_up_date),
  });
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const ok = await onSubmit(lead.id, form);
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>Edit Lead</h2>
            <button type="button" className="modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="modal-body">
            <div className="form-grid">
              <div className="form-field span-2">
                <label>Lead Name</label>
                <input className="form-input" value={form.lead_name} onChange={update('lead_name')} />
              </div>

              <div className="form-field span-2">
                <label>Business Name</label>
                <input className="form-input" value={form.business_name} onChange={update('business_name')} />
              </div>

              <div className="form-field">
                <label>Service</label>
                <select className="form-input" value={form.service} onChange={update('service')}>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>City</label>
                <input className="form-input" value={form.city} onChange={update('city')} />
              </div>

              <div className="form-field">
                <label>Est. Monthly Budget (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  value={form.budget}
                  onChange={update('budget')}
                />
              </div>

              <div className="form-field">
                <label>Owner</label>
                <input className="form-input" value={form.owner} onChange={update('owner')} />
              </div>

              <div className="form-field">
                <label>Priority</label>
                <select className="form-input" value={form.priority} onChange={update('priority')}>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Lead Source</label>
                <select className="form-input" value={form.lead_source} onChange={update('lead_source')}>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Stage</label>
                <select className="form-input" value={form.stage} onChange={update('stage')}>
                  {STAGE_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Next Follow-up Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.follow_up_date}
                  onChange={update('follow_up_date')}
                />
              </div>

              <div className="form-field span-2">
                <label>Notes</label>
                <textarea
                  className="form-textarea"
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="What happened on the last call?"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
