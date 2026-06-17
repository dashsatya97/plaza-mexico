import { Flame, Leaf, type LucideIcon } from "lucide-react";
import type { DietaryTag } from "../data/restaurant";

const styles: Record<DietaryTag, { cls: string; Icon?: LucideIcon }> = {
  Vegetarian: { cls: "bg-green-100 text-green-700", Icon: Leaf },
  Vegan: { cls: "bg-emerald-100 text-emerald-700", Icon: Leaf },
  Spicy: { cls: "bg-red-100 text-red-700", Icon: Flame },
  "Gluten-Free": { cls: "bg-amber-100 text-amber-700" },
};

type DietaryBadgesProps = {
  tags: DietaryTag[];
  className?: string;
};

/** Renders small colored pills for an item's dietary tags. */
export default function DietaryBadges({ tags, className }: DietaryBadgesProps) {
  if (!tags.length) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {tags.map((tag) => {
        const style = styles[tag];
        const Icon = style.Icon;
        return (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${style.cls}`}
          >
            {Icon && <Icon size={11} />}
            {tag}
          </span>
        );
      })}
    </div>
  );
}
