import styles from "@/app/styles/hexagon.module.css";

interface HexagonProps {
  children?: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
}

const Hexagon = ({ children, className, style = {} }: HexagonProps) => {
  return (
    <div className={`${styles.hexagon} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Hexagon;
