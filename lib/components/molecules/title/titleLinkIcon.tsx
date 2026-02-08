import ButtonLink from "@/lib/components/atoms/buttons/button_link";
import { IconType } from "@/lib/types/client/typeIcon";

interface TitleLinkIconProps {
  href: string;
  title: string;
  className?: string;
  icon?: IconType;
  sizeIcon?: number;
  textLink?: string;
}

const TitleLinkIcon = ({
  href,
  title,
  className = "",
  icon: Icon,
  sizeIcon = 16,
  textLink,
}: TitleLinkIconProps) => (
  <div className={`flex justify-between items-center mb-4 ${className}`}>
    <h3 className="flex items-center gap-2 text-sm font-bold">
      {Icon && <Icon size={sizeIcon} />} {title}
    </h3>
    <ButtonLink href={href} className="text-xs font-bold">
      {textLink}
    </ButtonLink>
  </div>
);

export default TitleLinkIcon;
