export const STAGE_LIST = [
  'New',
  'Contacted',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

const STAGE_CLASS_MAP = {
  New: 'stage-new',
  Contacted: 'stage-contacted',
  'Proposal Sent': 'stage-proposal-sent',
  Negotiation: 'stage-negotiation',
  'Closed Won': 'stage-closed-won',
  'Closed Lost': 'stage-closed-lost',
};

const STAGE_COLOR_MAP = {
  New: '#4338ca',
  Contacted: '#1d4ed8',
  'Proposal Sent': '#b45309',
  Negotiation: '#c2410c',
  'Closed Won': '#16a34a',
  'Closed Lost': '#dc2626',
};

export function stageClass(stage) {
  return STAGE_CLASS_MAP[stage] || 'stage-new';
}

export function stageColor(stage) {
  return STAGE_COLOR_MAP[stage] || '#4338ca';
}

export function priorityClass(priority) {
  if (!priority) return 'priority-low';
  const p = priority.toLowerCase();
  if (p === 'high') return 'priority-high';
  if (p === 'medium') return 'priority-medium';
  return 'priority-low';
}
