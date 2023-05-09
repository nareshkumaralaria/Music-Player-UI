import React, { useState } from 'react'
import './assets/styles/App.css'
import { getImageColors } from './utilities/functions/getImageColors'
import { Menu, SongPlayer, SongsList } from './components'

function App() {

  // Define state variables to track the active menu, current song ID, current song object,
  // current song index, and playlist songs list
  const [activeMenu, setActiveMenu] = useState({
    id: 1,
    title: 'For You'
  });
  const [currentSongId, setCurrentSongId] = useState('');
  const [currentSong, setCurrentSong] = useState({});
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [onePlaylistSongsList, setOnePlaylistSongsList] = useState([]);

  // Get the gradient color from the current song's photo using the getImageColors utility function
  let gradient = getImageColors(currentSong?.photo)

  return (
    <>
      {/* Render the app with a linear gradient background */}
      <div className='home'
        style={{ background: `linear-gradient(108.18deg, ${gradient} 2.46%, ${gradient} 99.84%)` }}
      >
        <div className="app" style={{ background: `linear-gradient(108.18deg, ${gradient} 2.46%, ${gradient} 99.84%)` }}>
          {/* Render the menu component with the active menu and setActiveMenu state */}
          <Menu
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu} />
          {/* Render the songs list component with various state variables */}
          <SongsList
            activeMenu={activeMenu}
            setCurrentSongId={setCurrentSongId}
            currentSongId={currentSongId}
            setCurrentSong={setCurrentSong}
            setCurrentSongIndex={setCurrentSongIndex}
            currentSongIndex={currentSongIndex}
            setOnePlaylistSongsList={setOnePlaylistSongsList} />
          {/* Render the song player component with various state variables and the gradient color */}
          <SongPlayer
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setCurrentSongIndex={setCurrentSongIndex}
            currentSongIndex={currentSongIndex}
            onePlaylistSongsList={onePlaylistSongsList}
            setCurrentSongId={setCurrentSongId}
            gradient={gradient} />
        </div>
      </div>
    </>
  )
}

export default App
