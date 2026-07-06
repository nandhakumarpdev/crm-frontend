import { STAGE_LIST, stageColor } from '../utils/stageStyles';

export default function PipelineSummary({ leads }) {
  const counts = STAGE_LIST.reduce((acc, stage) => {
    acc[stage] = 0;
    return acc;
  }, {});

  leads.forEach((lead) => {
    if (counts[lead.stage] !== undefined) {
      counts[lead.stage] += 1;
    }
  });

  return (
    <div className="pipeline-summary">
      {STAGE_LIST.map((stage) => (
        <div
          key={stage}
          className="summary-card accent-top"
          style={{ '--stage-color': stageColor(stage) }}
        >
          <div className="count">{counts[stage]}</div>
          <div className="label">{stage}</div>
        </div>
      ))}
    </div>
  );
}
