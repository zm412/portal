
import React, { Component } from 'react';

const useAudio = info => {
  const [sources] = React.useState(
    info.map(n => {
      return {
        url: n.url,
        audio: new Audio(n.url),
      }
    }),
  )

  const [players, setPlayers] = React.useState(
    info.map(n => {
      return {
        url: n.url,
        info: n.info,
        playing: false,
      }
    }),
  )

  const toggle = targetIndex => () => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  React.useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [sources, players])

  React.useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

  return [players, toggle]
}

export default useAudio;
