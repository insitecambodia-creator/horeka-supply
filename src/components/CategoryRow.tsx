import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

type CategoryRowProps = {
  slug: string;
  name: string;
  typicalItems: string;
  supplierCount: number;
  rotate: "left" | "right" | "none";
};

export function CategoryRow({ slug, name, typicalItems, supplierCount, rotate }: CategoryRowProps) {
  const sealRotation = rotate === "left" ? "-rotate-3" : rotate === "right" ? "rotate-2" : "-rotate-1";

  return (
    <Link
      href={`/category/${slug}`}
      className="group flex flex-col gap-2.5 py-4 border-b border-line last:border-b-[1.5px] last:border-ink hover:bg-paper-raised focus-visible:bg-paper-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp transition-colors sm:flex-row sm:items-center sm:gap-4"
    >
      <span className="flex items-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-stamp text-stamp bg-stamp/5 ${sealRotation}`}
        >
          <CategoryIcon slug={slug} className="h-5 w-5" />
        </span>

        <span className="min-w-0 flex-1 sm:hidden">
          <span className="block font-serif text-[19px] font-medium text-ink group-hover:text-stamp-dark">
            {name}
          </span>
          <span className="block text-[13px] text-ink-soft">{typicalItems}</span>
        </span>
      </span>

      <span className="hidden min-w-0 flex-1 sm:block">
        <span className="block font-serif text-[19px] font-medium text-ink group-hover:text-stamp-dark">
          {name}
        </span>
        <span className="block text-[13px] text-ink-soft">{typicalItems}</span>
      </span>

      <span className="pl-[60px] font-mono leading-tight sm:shrink-0 sm:pl-0 sm:text-right">
        <span className="block text-[17px] font-medium text-ink">{supplierCount}</span>
        <span className="block text-[10px] text-ink-soft">{supplierCount === 1 ? "supplier" : "suppliers"}</span>
      </span>
    </Link>
  );
}
