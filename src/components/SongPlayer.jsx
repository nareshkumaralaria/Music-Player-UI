import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/SongPlayer.css';
import Menu from '../assets/images/Menu.svg';
import Previous from '../assets/images/Previous.svg';
import Pause from '../assets/images/Pause.svg';
import Play from '../assets/images/Play.svg';
import Forward from '../assets/images/Forward.svg';
import Sound from '../assets/images/Sound.svg';
import ReactPlayer from 'react-player';

// SongPlayer component that handles the audio player and its controls
const SongPlayer = ({ currentSong, setCurrentSong, setCurrentSongIndex, currentSongIndex, onePlaylistSongsList, setCurrentSongId, gradient }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [seeking, setSeeking] = useState(false)
    const [played, setPlayed] = useState(0)
    const [muted, setMuted] = useState(false)
    const playerRef = useRef(null)

    // Update current song and song index whenever the currentSongIndex or onePlaylistSongsList changes
    useEffect(() => {
        if (onePlaylistSongsList[currentSongIndex] !== undefined && onePlaylistSongsList[currentSongIndex] !== null) {
            setCurrentSong(onePlaylistSongsList[currentSongIndex])
            setCurrentSongId(onePlaylistSongsList[currentSongIndex]._id)
            setPlayed(0)
            playerRef.current.seekTo(0)
        }
    }, [currentSongIndex, onePlaylistSongsList])

    // Toggle play/pause state
    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev)
    }

    // Play the previous song in the playlist
    const handlePrevious = () => {
        setPlayed(0)
        playerRef.current.seekTo(0)
        if (played <= 0.3 && currentSongIndex > 0) {
            setCurrentSongIndex((prev) => prev - 1)
        }
    }

    // Play the next song in the playlist
    const handleNext = () => {
        if (currentSongIndex < onePlaylistSongsList.length - 1) {
            setCurrentSongIndex((prev) => prev + 1)
            setPlayed(0)
            playerRef.current.seekTo(0)
        }
    }

    // Update the played time of the song
    const handleProgress = (state) => {
        if (!seeking) {
            setPlayed(state.played)
        }
    }

    // Set seeking state to true when the seek bar is being dragged
    const handleSeekMouseDown = () => {
        setSeeking(true)
    }

    // Set seeking state to false and seek to the new played time when the seek bar is released
    const handleSeekMouseUp = () => {
        setSeeking(false)
        playerRef.current.seekTo(played)
    }

    // Update the played time of the song when the seek bar is dragged
    const handleSeekChange = (e) => {
        const newTime = e.target.value
        setPlayed(newTime)
    }

    return (
        Object.keys(currentSong).length === 0
            ? <></>
            : <div className='songplayer'
                style={{ background: `linear-gradient(108.18deg, ${gradient} 2.46%, ${gradient} 99.84%)` }}
            >
                <div className='info'>
                    <div className='text-info'>
                        <h2>{currentSong.title}</h2>
                        <p>{currentSong.artist}</p>
                    </div>
                    <img src={currentSong.photo} />
                </div>

                <ReactPlayer
                    ref={playerRef}
                    url={currentSong.url}
                    playing={isPlaying}
                    onProgress={handleProgress}
                    controls={false}
                    muted={muted}
                    width="2px"
                    height="0px"
                />

                <div className='input-range'>
                    <input type='range' min='0' max='1' step='0.01' onMouseDown={handleSeekMouseDown} onMouseUp={handleSeekMouseUp} value={played} onChange={handleSeekChange} />
                    <div className='pointer' style={{ width: `${played * 100}%` }} ></div>
                </div>

                <div className='controls'>
                    <button className='menu'>
                        <img src={Menu} alt='Menu' />
                    </button>
                    <div className='center-control'>
                        <button onClick={handlePrevious}>
                            <img src={Previous} alt='Previous' />
                        </button>
                        <button className='play' onClick={handlePlayPause}>
                            {isPlaying ? (
                                <img src={Pause} alt='Play' />
                            ) : (
                                <img src={Play} alt='Play' />
                            )}

                        </button>
                        <button>
                            <img src={Forward} alt='Forward' onClick={handleNext} />
                        </button>
                    </div>

                    <button >
                        <img src={Sound} alt='Volume Up' />
                    </button>
                </div>
            </div>

    )
}

export default SongPlayer