import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albumVisible, setIsVisible] = useState(false);
  const [bookIsOpen, setBookIsOpen] = useState(false);
  
  const [is2022Book, set2022Book] = useState(false);
  const [year2022idx, set2022idx] = useState(0);

  const [is2023Book, set2023Book] = useState(false);
  const [year2023idx, set2023idx] = useState(0);

  const [is2024Book, set2024Book] = useState(false);
  const [year2024idx, set2024idx] = useState(0);
  useEffect(() => {
    if (bookIsOpen) {
      document.body.style.backgroundColor = "lightcoral";
    } else {
      document.body.style.backgroundColor = "#222";
    }

    // Clean up the effect on component unmount
    return () => {
      document.body.style.backgroundColor = "#222";
    };
  }, [bookIsOpen]);

  const importAll = (r) => r.keys().map(r);
  const album2022 = importAll(require.context('../2022', false, /\.(png|jpe?g|svg)$/));
  const album2023 = importAll(require.context('../2023images', false, /\.(png|jpe?g|svg)$/));
  const album2024 = importAll(require.context('../2024', false, /\.(png|jpe?j|svg)$/));

  const switchToAlbum = (event) => {
    event.preventDefault(); // Prevents page refresh
    setIsVisible((prev) => !prev);
  };

  const open2022Book = (event) => {
    event.preventDefault();
    setBookIsOpen(true);
    setIsVisible(false); 
    set2022Book(true);
    set2022idx(0); // Reset index for the 2022 book
  };

  const open2023Book = (event) => {
    event.preventDefault();
    setBookIsOpen(true);
    setIsVisible(false); 
    set2023Book(true);
    set2023idx(0); // Reset index for the 2023 book
  };

  const open2024Book = (event) => {
    event.preventDefault();
    setBookIsOpen(true);
    setIsVisible(false); 
    set2024Book(true);
    set2024idx(0); // Reset index for the 2024 book
  };

  const goToNextPage = () => {
    if (is2022Book && year2022idx < album2022.length - 1) {
      set2022idx(year2022idx + 1);
    } else if (is2023Book && year2023idx < album2023.length - 1) {
      set2023idx(year2023idx + 1);
    } else if (is2024Book && year2024idx < album2024.length - 1) {
      set2024idx(year2024idx + 1);
    }
  };

  const goToPreviousPage = () => {
    if (is2022Book && year2022idx > 0) {
      set2022idx(year2022idx - 1);
    } else if (is2023Book && year2023idx > 0) {
      set2023idx(year2023idx - 1);
    } else if (is2024Book && year2024idx > 0) {
      set2024idx(year2024idx - 1);
    }
  };

  const currentAlbum = is2022Book ? album2022 : is2023Book ? album2023 : album2024;

  return (
    <>
      {!albumVisible && !bookIsOpen &&
      <>
      <h1 class = "specialtwo">Happy Anniversary Fiona!</h1>
      <h1 class = "special" >Love You Willis</h1>
      <div className="heart-container">
        <div className="heart" onClick={switchToAlbum}></div>
      </div>
      </>
      }
      {albumVisible && (
        <div className="AlbumContainer">
          <div className="main-content">
            <h1>
              Fiona and Adam's 2 Year Anniversary<small>Hover on any notebook...</small>
            </h1>
            <div className="custom-wrapper" onClick={open2022Book}>
              <div className="custom-notebook">
                <div className="notebook-cover">
                  <div className="notebook-skin">2022</div>
                </div>
                <div className="notebook-page"></div>
              </div>
              <h4>2022</h4>
            </div>
            <div className="custom-wrapper" onClick={open2023Book}>
              <div className="custom-notebook">
                <div className="notebook-cover yellow">
                  <div className="notebook-skin">2023</div>
                </div>
                <div className="notebook-page"></div>
              </div>
              <h4>2023</h4>
            </div>
            <div className="custom-wrapper" onClick={open2024Book}>
              <div className="custom-notebook">
                <div className="notebook-cover green">
                  <div className="notebook-skin">2024</div>
                </div>
                <div className="notebook-page"></div>
              </div>
              <h4>2024</h4>
            </div>
          </div>
        </div>
      )}
      {bookIsOpen && (
        <div className="flip-book">
          <div className="page">
            <img src={currentAlbum[is2022Book ? year2022idx : is2023Book ? year2023idx : year2024idx]} alt={`Page ${is2022Book ? year2022idx : is2023Book ? year2023idx : year2024idx}`} />
          </div>
          <div className="navigation">
            <button onClick={goToPreviousPage} disabled={(is2022Book && year2022idx === 0) || (is2023Book && year2023idx === 0) || (is2024Book && year2024idx === 0)}>
              Previous
            </button>
            <button onClick={goToNextPage} disabled={(is2022Book && year2022idx === album2022.length - 1) || (is2023Book && year2023idx === album2023.length - 1) || (is2024Book && year2024idx === album2024.length - 1)}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
