import React from 'react';
import '../assets/styles/Menu.css';
import SpotifyLogo from '../assets/images/Spotify-logo.svg';
import Profile from '../assets/images/Profile.png';
import { useQuery } from '@apollo/client';
import Loader from './Loader';
import { GET_PLAYLISTS } from '../utilities/functions/GQL';

const Menu = ({ activeMenu, setActiveMenu }) => {

    // fetch playlists data from the server
    const { data, error, loading } = useQuery(GET_PLAYLISTS)

    // callback function to handle menu item click event
    const handleMenuItem = (list) => {
        setActiveMenu({ ...activeMenu, id: list.id, title: list.title });
    }

    return (
        <>
            <div className='menu'>
                <div className="itemlist">
                    <div className="logo">
                        <img src={SpotifyLogo} alt="logo" />
                    </div>
                    {
                        // show loader if the data is still loading
                        loading === true && <Loader />
                    }
                    {
                        // show error message if there is any error
                        error && <p>Error</p>
                    }
                    <div className="items">
                        {
                            // iterate through each playlist and render it as a menu item
                            data?.getPlaylists.map(list => {
                                return <p key={list.id} onClick={() => handleMenuItem(list)} className={list.id == activeMenu.id ? 'active' : ''} href="#">{list.title}</p>
                            })
                        }
                    </div>
                </div>
                <div className="profile">
                    <img src={Profile} alt="profile" />
                </div>
            </div>

        </>
    )
}

export default Menu