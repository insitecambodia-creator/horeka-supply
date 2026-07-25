import { getCategoriesGrouped } from "@/lib/data";
import { SupplierSubmissionForm } from "@/components/SupplierSubmissionForm";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const groups = await getCategoriesGrouped();

  const categoryGroups = [...groups.entries()].map(([group, categories]) => ({
    group,
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, emoji: c.emoji })),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">List your business</h1>
      <p className="mt-2 text-stone-600">
        Restaurant Cambodia Supply is a directory that helps hotels, restaurants and cafés in
        Cambodia find suppliers. Tell us about your business below — we review every submission
        before it goes live, so there&apos;s no need to worry about spam appearing instantly.
      </p>

      <div className="mt-8">
        <SupplierSubmissionForm categoryGroups={categoryGroups} />
      </div>
    </div>
  );
}
