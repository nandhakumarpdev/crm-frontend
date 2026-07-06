import { useState } from 'react';

const SERVICES = ['Meta Ads', 'Google Ads', 'SEO', 'Website', 'Other'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const SOURCES = ['Referral', 'Instagram', 'Website', 'Cold Call', 'WhatsApp', 'Other'];

const emptyForm = {
  lead_name: '',
  business_name: '',
  service: 'Meta Ads',
  city: '',
  budget: '',
  owner: '',
  priority: 'Medium',
  lead_source: 'Referral',
  notes: '',
  follow_up_date: '',
};

export default function LeadFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lead_name.trim() || !form.business_name.trim() || !form.service) {
      setFormError('Lead name, business name, and service are required.');
      return;
    }
    setFormError('');
    setSaving(true);
    const payload = { ...form, stage: 'New' };
    const ok = await onSubmit(payload);
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>Add Lead</h2>
            <button type="button" className="modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="modal-body">
            {formError && (
              <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 0 }}>
                {formError}
              </p>
            )}
            <div className="form-grid">
              <div className="form-field span-2">
                <label>Lead Name <span className="required-mark">*</span></label>
                <input
                  className="form-input"
                  value={form.lead_name}
                  onChange={update('lead_name')}
                  placeholder="e.g. Priya Sharma"
                  autoFocus
                />
              </div>

              <div className="form-field span-2">
                <label>Business Name <span className="required-mark">*</span></label>
                <input
                  className="form-input"
                  value={form.business_name}
                  onChange={update('business_name')}
                  placeholder="e.g. Sharma Interiors"
                />
              </div>

              <div className="form-field">
                <label>Service <span className="required-mark">*</span></label>
                <select className="form-input" value={form.service} onChange={update('service')}>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>City</label>
                <input className="form-input" value={form.city} onChange={update('city')} placeholder="e.g. Bangalore" />
              </div>

              <div className="form-field">
                <label>Est. Monthly Budget (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  value={form.budget}
                  onChange={update('budget')}
                  placeholder="e.g. 25000"
                />
              </div>

              <div className="form-field">
                <label>Owner</label>
                <input className="form-input" value={form.owner} onChange={update('owner')} placeholder="Sales rep name" />
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
                  placeholder="Anything worth remembering from first contact…"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { SERVICES, PRIORITIES, SOURCES };
