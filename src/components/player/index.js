/* eslint-disable no-unused-vars */
import React, { useState, useContext, createContext } from 'react';
import ReactDom from 'react-dom';
import { Button, Close, Inner, Container, Overlay } from './styles/player';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false)

  return (
    <PlayerContext.Provider value={{showPlayer, setShowPlayer}}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  )
}

Player.Video = function PlayerVideo({src, ...restProps}){
  const {showPlayer, setShowPlayer} = useContext(PlayerContext);

  return showPlayer ? ReactDom.createPortal(
    <Overlay onClick={() => setShowPlayer(false)} {...restProps}>
      <Inner>
        <video id="netflixPlayer" controls>
          <source src={src} type="video/mp4" />
        </video>
        <Close />
      </Inner>
    </Overlay>,
    document.body
  ) : null
}

Player.Button = function PlayerButton({...restProps}) {
  const {showPlayer, setShowPlayer} = useContext(PlayerContext)

  return <Button onClick={() => setShowPlayer(showPlayer => !showPlayer)}>Play</Button>
}