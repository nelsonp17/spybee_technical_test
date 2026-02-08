import Hexagon from "@/lib/components/atoms/hexagon";
import { useUserInitials } from "@/lib/hooks/useProjectStats";
import { User } from "@/lib/types/server/project";

interface Props {
  users: User[];
  limit?: number;
}

const StackedHexagonsTeam = ({ users, limit = 3 }: Props) => {
  const { visibleUsers, remainingCount, hasMore } = useUserInitials(
    users,
    limit,
  );

  const getHexagonStyle = (index: number) => {
    const colorIndex = Math.min(index + 1, 10);

    // Retornamos un objeto de estilos y clases separadas
    return {
      style: {
        backgroundColor: `var(--color-light-yellow-${colorIndex})`,
        color: colorIndex > 7 ? "black" : "black",
      },
      className: "w-6 h-7 font-bold text-[10px] mr-1",
    };
  };

  return (
    <div className="flex -space-x-2">
      {/* Hexágonos de iniciales */}
      {visibleUsers.map((initials, index) => {
        const { style, className } = getHexagonStyle(index);
        return (
          <Hexagon key={index} style={style} className={className}>
            {initials}
          </Hexagon>
        );
      })}

      {/* Hexágono de "+X" */}
      {hasMore && (
        <Hexagon
          className="w-6 h-7 font-bold text-[10px] mr-1"
          style={{
            backgroundColor: `${visibleUsers.length < 5 ? `var(--color-light-yellow-${visibleUsers.length})` : "var(--color-light-yellow-1)"}`,
            color: "black",
          }}
        >
          {remainingCount}+
        </Hexagon>
      )}
    </div>
  );
};
export default StackedHexagonsTeam;
