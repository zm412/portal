import React, { useState, useEffect } from "react";
import { Button, Carousel, Card } from 'react-bootstrap';

const useAudio2 = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio2(url);

  return (
    <div>
      <Button variant="primary" onClick={toggle}>{playing ? "Pause" : "Play"}</Button>
    </div>
  );
};

export default Player;
