import React, { useEffect, useMemo, useState } from 'react';
import '../assets/styles/SongsList.css';
import SerachIcon from '../assets/images/Search-Icon.svg';
import { useQuery } from '@apollo/client';
import { GET_SONGS } from '../utilities/functions/GQL';
import { convertSecondsToMinutesSeconds } from '../utilities/functions/timeFormat.js'
import Loader from './Loader';

const SongsList = ({ activeMenu, setCurrentSongId, currentSongId, setCurrentSong, setCurrentSongIndex, setOnePlaylistSongsList }) => {

    const [filteredSongsList, setFilteredSongsList] = useState([]);
    const [serachQuery, setSerachQuery] = useState('');
    const { data, error, loading } = useQuery(GET_SONGS, {
        variables: { activeMenuId: activeMenu.id },
    })

    // Get songs list data only once when component mounts
    const getSongsList = useMemo(() => {
        return data?.getSongs || []
    }, [data])

    const handleCurrentSong = (item, idx) => {
        console.log("item :", item);
        setCurrentSongId(item._id);
        setCurrentSong(item);
        setCurrentSongIndex(idx);
        setOnePlaylistSongsList(getSongsList);
    }

    // Filter songs list based on the search query
    const filterSongs = (query, songs) => {
        const regex = new RegExp(query, 'i');
        return songs.filter(song => regex.test(song.title) || regex.test(song.artist));
    };

    useEffect(() => {
        // Update the filtered songs list based on the search query and the songs list
        setFilteredSongsList(filterSongs(serachQuery, getSongsList));
    }, [serachQuery, getSongsList])

    return (
        <div className='songlist' style={{ paddingBottom: currentSongId !== '' && window.innerWidth < 769 ? '170px' : '0' }}>
            <div className="playlist-title">{activeMenu.title}</div>
            <div className='search'>
                <input type="text" value={serachQuery} onChange={(e) => setSerachQuery(e.target.value)} placeholder='Search Song, Artist' />
                <span><img src={SerachIcon} alt="" /></span>
            </div>

            {
                // show loader if the data is still loading
                loading === true && <Loader />
            }
            {
                // show error message if there is any error
                error && <p>Error</p>
            }

            <div className="list">
                {
                    filteredSongsList.map((item, idx) => {
                        return <div key={item._id} className={`listitem ${currentSongId === item._id ? 'active' : ""} `} onClick={() => handleCurrentSong(item, idx)}>
                            <div className='info'>
                                <img src={item.photo} alt='cover' />
                                <div className='song-info'>
                                    <h3>{item.title}</h3>
                                    <h4>{item.artist}</h4>
                                </div>
                            </div>
                            <span>{convertSecondsToMinutesSeconds(item.duration)}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default SongsList