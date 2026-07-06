import { useState, useEffect, useCallback, useMemo } from 'react';
import { getLeads, createLead, updateLead, deleteLead } from '../services/api';
 
export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stage, setStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null); // { type, message }
 
  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);
 
  const fetchLeads = useCallback(async (stageValue) => {
    setLoading(true);
    setError('');
    try {
      const data = await getLeads(stageValue);
      setLeads(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError('Could not load leads. Check that the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);
 
  useEffect(() => {
    fetchLeads(stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);
 
  const addLead = useCallback(
    async (payload) => {
      try {
        await createLead(payload);
        await fetchLeads(stage);
        showToast('success', 'Lead added successfully.');
        return true;
      } catch (err) {
        showToast('error', 'Could not add lead. Please check the form and try again.');
        return false;
      }
    },
    [fetchLeads, stage, showToast]
  );
 
  const editLead = useCallback(
    async (id, payload) => {
      try {
        await updateLead(id, payload);
        await fetchLeads(stage);
        showToast('success', 'Lead updated successfully.');
        return true;
      } catch (err) {
        showToast('error', 'Could not update lead. Please try again.');
        return false;
      }
    },
    [fetchLeads, stage, showToast]
  );
 
  const removeLead = useCallback(
    async (id) => {
      try {
        await deleteLead(id);
        await fetchLeads(stage);
        showToast('success', 'Lead deleted.');
        return true;
      } catch (err) {
        showToast('error', 'Could not delete lead. Please try again.');
        return false;
      }
    },
    [fetchLeads, stage, showToast]
  );
 
  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.trim().toLowerCase();
    return leads.filter(
      (lead) =>
        lead.lead_name?.toLowerCase().includes(term) ||
        lead.business_name?.toLowerCase().includes(term)
    );
  }, [leads, searchTerm]);
 
  return {
    leads: filteredLeads,
    allLeadsForSummary: leads,
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
    refresh: () => fetchLeads(stage),
  };
}