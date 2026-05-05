"use client";

type BibleStudiesSeriesListItem = {
  key: string;
  title: string;
  subtitle: string;
  coverSrc: string | null;
  statusLabel: string;
  statusTone?: "current" | "upcoming" | "past" | "pro" | "preview" | "locked";
  detail?: string | null;
  footerLeft?: string | null;
  footerRight?: string | null;
  onClick?: (() => void) | null;
  disabled?: boolean;
};

type BibleStudiesSeriesListProps = {
  items: BibleStudiesSeriesListItem[];
  loading?: boolean;
  emptyMessage?: string;
};

function getStatusClasses(tone: BibleStudiesSeriesListItem["statusTone"]) {
  switch (tone) {
    case "current":
      return "bg-[#d4ecd4] text-[#4f7e54]";
    case "upcoming":
      return "bg-[#fff1f1] text-[#d62828]";
    case "past":
      return "bg-[#efe0ff] text-[#7d4ab3]";
    case "pro":
      return "bg-[#fff1f1] text-[#d62828]";
    case "preview":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

function renderCardBody(item: BibleStudiesSeriesListItem) {
  return (
    <>
      <div className="p-2 sm:p-3">
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          {item.coverSrc ? (
            <img
              src={item.coverSrc}
              alt={`${item.title} cover`}
              className="h-40 w-full object-cover sm:h-48"
              style={{
                objectPosition:
                  item.title === "The Testing of Joseph"
                    ? "center 30%"
                    : item.title === "The Temptation of Jesus"
                      ? "center 42%"
                      : "center center",
              }}
            />
          ) : (
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 sm:h-48" />
          )}
        </div>
      </div>
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold leading-tight text-gray-900">{item.title}</p>
          <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(item.statusTone)}`}>
            {item.statusLabel}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
        {item.detail ? <p className="mt-3 text-sm text-gray-700">{item.detail}</p> : null}
        {item.footerLeft || item.footerRight ? (
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-gray-500">{item.footerLeft}</span>
            <span className={`font-semibold ${item.disabled ? "text-gray-400" : "text-[#8d5d38]"}`}>
              {item.footerRight}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default function BibleStudiesSeriesList({
  items,
  loading = false,
  emptyMessage = "No Bible studies available yet.",
}: BibleStudiesSeriesListProps) {
  if (loading) {
    return <p className="py-8 text-center text-sm text-gray-400">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => {
        const className = `w-full overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
          item.onClick
            ? "border-gray-200 bg-white shadow-sm hover:scale-[1.01] hover:shadow-xl"
            : item.disabled
              ? "cursor-default border-gray-200 bg-white opacity-80 shadow-sm"
              : "border-gray-200 bg-white shadow-sm"
        }`;

        if (item.onClick) {
          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={className}
            >
              {renderCardBody(item)}
            </button>
          );
        }

        return (
          <div key={item.key} className={className}>
            {renderCardBody(item)}
          </div>
        );
      })}
    </div>
  );
}
