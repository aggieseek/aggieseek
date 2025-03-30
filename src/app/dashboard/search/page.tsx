import SearchMenu from "@/components/search-menu";

export default function Search() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-x-8 border-b pb-3 mb-6">
        <div className="font-bold pt-1 text-nowrap text-xl flex-1">
          Course Catalog
        </div>
      </div>

      <SearchMenu />
    </div>
  );
}
