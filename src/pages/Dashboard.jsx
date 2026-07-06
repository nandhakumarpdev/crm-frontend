import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import PipelineSummary from '../components/PipelineSummary';
import StageFilter from '../components/StageFilter';
import SearchBar from '../components/SearchBar';
import LeadTable from '../components/LeadTable';
import LeadFormModal from '../components/LeadFormModal';
import EditLeadModal from '../components/EditLeadModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { useLeads } from '../hooks/useLeads';

export default function Dashboard() {
  const {
    leads,
    allLeadsForSummary,
    loading,
    error,
    stage,
    setStage,
    searchTerm,
    setSearchTerm,
    addLead,
    editLead,
    removeLead,
    toast,
  } = useLeads();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);

  return (
    <div className="main-content">
      <DashboardHeader onAddLead={() => setShowAddModal(true)} />

      <PipelineSummary leads={allLeadsForSummary} />

      <div className="toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <StageFilter value={stage} onChange={setStage} />
      </div>

      {error ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>{error}</h3>
        </div>
      ) : (
        <LeadTable
          leads={leads}
          loading={loading}
          hasFilters={Boolean(searchTerm) || stage !== 'All'}
          onEdit={setEditingLead}
          onDelete={setDeletingLead}
        />
      )}

      {showAddModal && (
        <LeadFormModal onClose={() => setShowAddModal(false)} onSubmit={addLead} />
      )}

      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSubmit={editLead}
        />
      )}

      {deletingLead && (
        <DeleteConfirmModal
          lead={deletingLead}
          onClose={() => setDeletingLead(null)}
          onConfirm={removeLead}
        />
      )}

      {toast && (
        <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
