import { useEffect, useState } from "react";
import axios from "axios";
import MoodFilter from "./MoodFilter";
import ContentList from "./ContentList";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function ContentContainer() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showAnimeContent, setShowAnimeContent] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMood, setSelectedMood] = useState('');
  const [hiddenAnime, setHiddenAnime] = useState(new Set());

  // Fetch genres on mount
  useEffect(() => {
    axios.get('https://api.jikan.moe/v4/genres/anime')
      .then(response => setGenres(response.data.data))
      .catch(err => {
        console.error('Failed to fetch genres:', err);
        setError("Failed to load genres.");
      });
  }, []);

  // Fetch anime list whenever filters or page change
  useEffect(() => {
    setError(null);
    setLoading(true);

    axios.get('https://api.jikan.moe/v4/anime', {
      params: {
        order_by: 'popularity',
        sort: 'asc',
        limit: 1,
        min_score: 7.5,
        page,
        unapproved: false,
        ...(selectedGenres.includes('Highrated Anime this year')
          ? { start_date: `${new Date().getFullYear()}-01-01` }
          : selectedGenres.length > 0
            ? { genres: selectedGenres.join(',') }
            : {})
      }
    })
      .then(response => setAnimeList(response.data.data))
      .catch(err => {
        console.error('Failed to fetch AnimeList:', err);
        setError("Failed to load anime. Try again later.");
      })
      .finally(() => setLoading(false));
  }, [page, selectedGenres]);

  // Toggle genres
  const toggleGenre = (moodName, genreName) => {
    setSelectedGenres(prev => {
      if (genreName === 'Highrated Anime this year') {
        return prev.includes(genreName)
          ? prev.filter(item => item !== genreName)
          : [...prev, genreName];
      }
      const genreId = genres.find(genre => genre.name === genreName)?.mal_id;
      return genreId
        ? (prev.includes(genreId)
          ? prev.filter(id => id !== genreId)
          : [...prev, genreId])
        : prev;
    });
    setPage(1);
    setShowAnimeContent(true);
    setSelectedMood(moodName);
  };

  // Reset filters
  const handleBackButtonClick = () => {
    setShowAnimeContent(false);
    setSelectedGenres([]);
    setSelectedMood('');
  };

  // Pagination
  const handleNextPage = () => setPage(p => p + 1);
  const handlePrevPage = () => setPage(p => Math.max(p - 1, 1));

  // Hide anime
  const handleHideClick = (animeId) => {
    setHiddenAnime(prev => {
      const updated = new Set(prev);
      updated.has(animeId) ? updated.delete(animeId) : updated.add(animeId);
      return updated;
    });

    if (animeList.length - 1 === [...hiddenAnime].indexOf(animeId)) {
      handleNextPage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <NavBar onBackClick={handleBackButtonClick} selectedMood={selectedMood} />

      {!showAnimeContent && (
        <div className="py-6 px-4 md:px-8">
          <MoodFilter selectedGenre={selectedGenres} toggleGenre={toggleGenre} />
        </div>
      )}

      {showAnimeContent && (
        <div className="py-4 px-4 md:px-8">
          {error && <div className="text-red-600 font-semibold">{error}</div>}
          <ContentList
            animeList={animeList}
            loading={loading}
            error={error}
            page={page}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            hiddenAnime={hiddenAnime}
            handleHideClick={handleHideClick}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
