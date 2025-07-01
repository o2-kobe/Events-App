import { useRefinementList } from "react-instantsearch";

export default function CategoryRefinementList({
  attribute,
}: {
  attribute: string;
}) {
  const { items, refine } = useRefinementList({
    attribute,
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      {items.length === 0 ? (
        <div className="text-gray-400 text-sm">No categories found.</div>
      ) : (
        items.map((item) => (
          <div
            key={item.label}
            className={`flex justify-between items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer text-gray-800 ${
              item.isRefined ? "bg-blue-100 text-blue-700 font-semibold" : ""
            }`}
            onClick={() => refine(item.value)}
            style={{ userSelect: "none" }}
          >
            <span>{item.label}</span>
            <span className="text-xs text-gray-500 ml-2">({item.count})</span>
          </div>
        ))
      )}
    </div>
  );
}
