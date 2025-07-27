import Button from "./Button";

export default function ContentList({ animeList, loading, error, page, handleHideClick, hiddenAnime, handleNextPage, handlePrevPage }) {
  const filteredAnimeList = animeList.filter((anime) => !hiddenAnime.has(anime.mal_id));

  const handleCopyTitle = (title) => {
    navigator.clipboard.writeText(title)
      .then(() => alert(`${title} copied to clipboard!`))
      .catch((err) => console.error("Failed to copy title: ", err));
  };

  return (
    <div className="center-container my-6">
      <div className="w-full max-w-4xl mx-auto">
        {filteredAnimeList.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-lg">
            <p className="text-gray-300 text-center mb-4">This Anime is Hidden</p>
            <div className="flex justify-between">
              <Button onClick={handlePrevPage} text="⬅️ Back" />
              <Button onClick={handleNextPage} text="Next ➡️" />
            </div>
          </div>
        ) : (
          filteredAnimeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl mb-10 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-[16/9] w-full">
                {anime.trailer?.embed_url ? (
                  <iframe
                    className="w-full h-full"
                    src={anime.trailer.embed_url}
                    title={`${anime.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-center p-3 text-gray-400">Trailer not available</p>
                )}
              </div>

              <div className="p-6">
                <h2
                  className="text-2xl font-extrabold text-white mb-1 cursor-pointer hover:underline"
                  onClick={() => handleCopyTitle(anime.title)}
                >
                  {anime.title}
                </h2>
                <p className="text-gray-400 mb-3 text-sm">
                  {anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A'}
                  &nbsp;·&nbsp; {anime.episodes ?? 'N/A'} ep&nbsp;·&nbsp;⭐{anime.score}
                  &nbsp;·&nbsp;🏆 Top {anime.popularity}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres?.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border border-purple-700 rounded-full text-purple-300 text-xs font-medium"
                    >
                      {genre.name}
                    </span>
                  )) || (
                    <span className="px-3 py-1 border border-purple-700 rounded-full text-purple-300 text-xs font-medium">
                      N/A
                    </span>
                  )}
                </div>

                <p className="text-gray-300 font-light">
                  {anime.synopsis?.split('.')[0] + '.'}
                </p>

                <div className="flex justify-between mt-6">
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
