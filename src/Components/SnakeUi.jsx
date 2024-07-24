import React, { useState, useEffect, useRef } from 'react';
import '../Components/Snake.css';

const SnakeUi = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameBoardRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
          setDirection('LEFT');
          break;
        case 38:
          setDirection('UP');
          break;
        case 39:
          setDirection('RIGHT');
          break;
        case 40:
          setDirection('DOWN');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection('RIGHT');
        setScore(0);
        setGameOver(false);
      }, 6000);
    } else {
      const moveSnake = () => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'LEFT':
            head.x -= 1;
            break;
          case 'UP':
            head.y -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
          setScore(score + 1);
        } else {
          newSnake.pop();
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return;
        }

        setSnake(newSnake);
      };

      const gameInterval = setInterval(moveSnake, 200);
      return () => clearInterval(gameInterval);
    }
  }, [snake, direction, food, gameOver]);
console.log(score)
  return (
    <div>
      <h1>Snake </h1>
      <div className="score">Score: {score}</div>
      <div ref={gameBoardRef} className="game-board">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
          />        ))}
        <div className="food" style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }} />
        {gameOver && <div className="game-over">Game Over !</div>}
      </div>
    </div>
  );
};

export default SnakeUi;
