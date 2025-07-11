import { useState ,useEffect } from 'react';
import React from 'react';

const PlayerModal = ({ players = [], onConfirm, onClose, videoRef, setIsPlaying, title, selectingPlayerOut, selectingPlayerIn }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    setSelectedPlayer('');
  }, [selectingPlayerOut, selectingPlayerIn]);

  const handleConfirm = () => {
    if (selectedPlayer) {
      onConfirm(selectedPlayer);
      if (videoRef?.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      if (!selectingPlayerOut && !selectingPlayerIn) {
        onClose();
      }
    } else {
      alert('Please select an option');
    }
  };

  useEffect(() => {
    console.log('Modal showing with:', {
      selectingPlayerOut,
      selectingPlayerIn,
      title,
      players
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-xl w-80">
        <h2 className="text-lg mb-2">
          {selectingPlayerOut ? 'Select Player Out' :
            selectingPlayerIn ? 'Select Player In' :
              'Select Player'}
        </h2>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select a player</option>
          {players.length > 0 && typeof players[0] === 'object'
            ? players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))
            : players.map((player) => (
              <option key={player} value={player}>{player}</option>
            ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!selectedPlayer) return alert('Please select an option');
              if (players.length > 0 && typeof players[0] === 'object') {
                const playerObj = players.find(p => p.id.toString() === selectedPlayer);
                onConfirm(playerObj);
              } else {
                onConfirm(selectedPlayer);
              }
              if (videoRef?.current) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
              if (!selectingPlayerOut && !selectingPlayerIn) {
                onClose();
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlayer}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;