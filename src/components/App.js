import '../styles/App.scss';
import { useState } from 'react';
import dataAnime from '../data/data.json';
import { v4 as uuid } from 'uuid';

function App() {
  const [animeList, setAnimeList] = useState(dataAnime);
  const [searchFilter, setSearchFilter] = useState('');
  const [inputText, setInputText] = useState('');
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);

  const handleClick = (ev) => {
    ev.preventDefault();
    setSearchFilter(inputText);
  };

  const handleFilter = (ev) => {
    setInputText(ev.currentTarget.value);
  };

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchFilter.toLowerCase())
  );
  const handleFavorite = (ev) => {
    ev.preventDefault();
    const clickedAnimeId = ev.currentTarget.id;
    const foundAnime = animeList.find((anime) => anime.id === clickedAnimeId);
    favoriteAnimes.push(foundAnime);
    setFavoriteAnimes([...favoriteAnimes]);
  };

  // const htmlLiFavAnime = foundAnime.map((anime) => {
  //   let identifier = uuid();
  //   <li key={identifier} id={identifier}>
  //     <h2 className="title">{anime.title}</h2>
  //     <img
  //       src={anime.img}
  //       title="carátula del anime"
  //       alt="carátula del anime"
  //       onClick={handleFavorite}
  //     ></img>
  //     <h3>{anime.year}</h3>
  //     <h4>{anime.genre}</h4>
  //   </li>;
  // });

  const htmlLi = filteredAnime.map((anime, i) => {
    let colorText = null;
    if (anime.year <= '1998') {
      colorText = 'red';
    }
    let identifier = uuid(); //I need that both (key and id) have the same number! Is the only way that I know..
    return (
      <li key={identifier} id={identifier}>
        <h2 className="title">{anime.title}</h2>
        <img
          src={anime.img}
          title="carátula del anime"
          alt="carátula del anime"
          onClick={handleFavorite}
        ></img>
        <h3 className={colorText}>{anime.year}</h3>
        <h4>{anime.genre}</h4>
      </li>
    );
  });

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Buscador de Series de Anime</h1>
        <form className="">
          <input
            type="text"
            className="js-inputTitle"
            value={inputText}
            onChange={handleFilter}
          />
          <button className="js-searchButton" onClick={handleClick}>
            {' '}
            Enviar{' '}
          </button>
          <button type="button" className="js-resetButton">
            Borrar resultados
          </button>
        </form>
      </header>
      <main className="main js-main">
        <section className="main__result js-sectionResults">
          <h2 className="main__result--title">Resultados</h2>
          <nav className="nav">
            <ul className="">{htmlLi}</ul>
          </nav>
        </section>
        <section className="main__favorites ">
          <h2 className="main__favorites--title">Series favoritas</h2>
          <nav className="nav">
            <ul className="js-ulFavs nav__ul"></ul>
            <button className="js-resetFavs buttonResetAll">
              {' '}
              <span></span>
              <span></span>
              <span></span>
              <span></span>Borrar favoritos
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
}

export default App;
