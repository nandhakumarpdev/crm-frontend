export default function DashboardHeader({ onAddLead }) {
  return (
    <div className="dashboard-header">
      <div>
        <h1>Leads</h1>
        <p>Track every lead from first contact to closed deal.</p>
      </div>
      <button className="btn btn-primary" onClick={onAddLead}>
        + Add Lead
      </button>
    </div>
  );
}
