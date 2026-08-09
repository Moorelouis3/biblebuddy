// Lightweight YouTube embed for blog posts. The iframe is lazy loaded, so
// nothing is fetched from YouTube until the reader scrolls near it. Also
// emits VideoObject schema so Google can surface the video in search.
type BlogVideoEmbedProps = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
  caption?: string;
};

export default function BlogVideoEmbed({
  videoId,
  title,
  description,
  uploadDate,
  caption,
}: BlogVideoEmbedProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };

  return (
    <div className="my-10">
      <div className="overflow-hidden rounded-[24px] bg-slate-950 shadow-[0_18px_48px_rgba(15,23,42,0.16)]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full border-0"
        />
      </div>
      {caption ? (
        <p className="mt-3 text-center text-sm font-bold text-[#6d7789]">{caption}</p>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
