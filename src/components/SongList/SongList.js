import React from 'react';
import styles from './SongList.module.css';

function SongList({ songs, loading , searchBy}) {
    if (!loading && songs) {
        if (searchBy === 'track') {
            return(
                <div className={styles.list}>
                    {songs.tracks.items.map(song => (
                        <div className={styles.track} key={song.id}>
                            <h3>{ song.name}</h3>
                            <h4>{ song.artists[0].name}</h4>
                            <a href={song.uri}><img src={ song.album.images[0].url }/></a>
                            <h5>{ song.album.name}</h5>
                            <p>Released: {song.album.release_date}</p>
                        </div>
                    ))}
                </div>
            )
        }
    }
}

export default SongList;