import styles from "@/app/styles/progress_card.module.css";

interface ProgressCardProps {
  label: string;
  total: number;
  open: number;
}

const ProgressCard = ({ label, total, open }: ProgressCardProps) => {
  return (
    <div className="bg-gray-50 p-2 rounded-lg border border-gray-50 flex flex-col">
      <span className="font-bold">{label}</span>
      <span className="text-3xl font-bold text-gray-800">{total}</span>
      <span className="text-gray-800 mb-2 text-[12px] md:text-[14px]">
        Total Abiertas
      </span>

      <div
        className={styles.progressRing}
        style={
          {
            "--p": (open / total) * 100,
          } as React.CSSProperties
        }
      >
        <div className={styles.progressRingInner}>{open}</div>
      </div>
    </div>
  );
};

export default ProgressCard;
