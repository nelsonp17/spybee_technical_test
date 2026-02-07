const IncidentMetric = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="font-bold text-[#333]">{value}</div>
    <div className="text-[10px] text-gray-400">{label}</div>
  </div>
);
export default IncidentMetric;
