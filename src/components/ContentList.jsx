import Button from "./Button";
import { useState } from "react";

export default function ContentList({
  animeList,
  loading,
  error,
  page,
  handleHideClick,
  hiddenAnime,
  handleNextPage,
  handlePrevPage,
}) {
  const [copiedTitle, setCopiedTitle] = useState(null);
  const filteredAnimeList = animeList.filter((anime) => !hiddenAnime.has(anime.mal_id));

  const handleCopyTitle = (title) => {
    navigator.clipboard.writeText(title)
      .then(() => {
        setCopiedTitle(title);
        setTimeout(() => setCopiedTitle(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy title: ", err);
      });
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-lg text-blue-500 animate-pulse">
        Loading anime...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl mt-4 p-4">
        {filteredAnimeList.length === 0 ? (
          <div className="text-center py-10">
            <p className="mb-4 text-gray-500">All anime on this page are hidden.</p>
            <div className="flex justify-between">
              <Button onClick={handlePrevPage} text="⬅️ Back" />
              <Button onClick={handleNextPage} text="Next ➡️" />
            </div>
          </div>
        ) : (
          filteredAnimeList.map((anime) => (
            <div key={anime.mal_id} className="mb-10">
              <div className="aspect-video w-full rounded overflow-hidden mb-3">
                {anime.trailer?.embed_url ? (
                  <iframe
                    className="w-full h-full"
                    src={anime.trailer.embed_url}
                    title={`${anime.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="text-center text-gray-400 py-10">
                    Trailer not available.
                  </div>
                )}
              </div>

              <div className="card-body space-y-3">
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold cursor-pointer hover:underline"
                    onClick={() => handleCopyTitle(anime.title)}
                    title="Click to copy"
                  >
                    {anime.title}
                  </h2>
                  {copiedTitle === anime.title && (
                    <span className="text-green-600 text-sm">Copied!</span>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  {anime.aired?.from ? new Date(anime.aired.from).getFullYear() : "N/A"}
                  &nbsp; · &nbsp; {anime.episodes ?? "N/A"} ep
                  &nbsp; · ⭐ {anime.score}
                  &nbsp; · 🏆 Top {anime.popularity}
                </p>

                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map((genre, index) => (
                    <span key={index} className="badge badge-outline badge-secondary">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700">{anime.synopsis?.split(".")[0] + "."}</p>

                <div className="flex justify-between mt-4">
                  <Button onClick={handlePrevPage} text="⬅️ Back" />
                  <Button onClick={() => handleHideClick(anime.mal_id)} text="🙈 Hide" />
                  <Button onClick={handleNextPage} text="Next ➡️" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
