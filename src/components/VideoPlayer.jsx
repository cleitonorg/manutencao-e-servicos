export default function VideoPlayer({ url, titulo }) {
  // Aceita URL do YouTube (watch ou embed) e converte para embed.
  if (!url) return null;
  let embedUrl = url;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (match) {
    embedUrl = `https://www.youtube.com/embed/${match[1]}`;
  }
  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedUrl}
        title={titulo || "Vídeo"}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}