import { getTerms } from "@/actions/terms";
import SearchMenu from "@/components/search/search-menu";

export default async function Search() {
  const terms = await getTerms();

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-x-8 border-b pb-4 mb-6">
        <div className="flex items-center font-bold h-10 text-xl flex-1">
          Course Catalog
        </div>
      </div>

      <SearchMenu terms={terms} />
    </div>
  );
}
