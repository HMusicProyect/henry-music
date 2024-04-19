"use client"

import usePlayer from '@/store/hooks/usePlayer';
import useStore from '@/store/songs.store';
import React from 'react'
import PlayerContent from './PlayerContent';


const Player = () => {
  const player = usePlayer();
  const { todos } = useStore();

  const numericId = player.activeId && parseInt(player.activeId, 10);
  const activeSong = todos.find(song => song.id === numericId);

  return (
      <div className='fixed bottom-0 bg-black w-full py-2 px-4'>
          {activeSong && (
              <PlayerContent 
                  key={activeSong.id} 
                  song={activeSong}
                  songUrl={activeSong.pathMusic}
              />
          )}
      </div>
  );
}

export default Player