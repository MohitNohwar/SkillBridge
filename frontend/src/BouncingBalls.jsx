import React, { useState, useEffect, useRef } from 'react';
import './BouncingBalls.css';

const BouncingBall = ({ children, isRole, color, initialTop, initialLeft }) => {
  const [position, setPosition] = useState({ x: initialLeft, y: initialTop });
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 1,
    y: (Math.random() - 0.5) * 2,
  });
  const ballRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!ballRef.current) return;

      const ballRect = ballRef.current.getBoundingClientRect();
      const parentRect = ballRef.current.parentElement.getBoundingClientRect();

      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;
      let newVelX = velocity.x;
      let newVelY = velocity.y;

      if (newX <= 0 || newX + ballRect.width >= parentRect.width) {
        newVelX *= -1;
      }
      if (newY <= 0 || newY + ballRect.height >= parentRect.height) {
        newVelY *= -1;
      }
      
      // Clamp position to be within bounds
      newX = Math.max(0, Math.min(newX, parentRect.width - ballRect.width));
      newY = Math.max(0, Math.min(newY, parentRect.height - ballRect.height));


      setPosition({ x: newX, y: newY });
      setVelocity({ x: newVelX, y: newVelY });
    };

    const animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, velocity]);

  const ballStyle = {
    top: `${position.y}px`,
    left: `${position.x}px`,
    backgroundColor: isRole ? color : undefined,
  };

  if (!isRole) {
    const size = Math.random() * 50 + 10;
    ballStyle.width = `${size}px`;
    ballStyle.height = `${size}px`;
    ballStyle.backgroundColor = ['#FFC0CB', '#E6E6FA', '#FFDAB9', '#DDA0DD', '#F08080'][Math.floor(Math.random() * 5)];
  }

  return (
    <div
      ref={ballRef}
      className={`ball ${isRole ? 'role-ball' : 'background-ball'}`}
      style={ballStyle}
    >
      {children}
    </div>
  );
};

const BouncingBallsContainer = () => {
    const backgroundBalls = Array.from({ length: 15 }).map((_, i) => (
        <BouncingBall key={`bg-${i}`} isRole={false} initialTop={Math.random() * window.innerHeight} initialLeft={Math.random() * window.innerWidth} />
      ));

  return (
    <div className="bouncing-balls-container">
      {backgroundBalls}
      <BouncingBall isRole={true} color="#FFDDC1" initialTop={window.innerHeight * 0.2} initialLeft={window.innerWidth * 0.15}>Admin</BouncingBall>
      <BouncingBall isRole={true} color="#FFFACD" initialTop={window.innerHeight * 0.5} initialLeft={window.innerWidth * 0.6}>Client</BouncingBall>
      <BouncingBall isRole={true} color="#F0E68C" initialTop={window.innerHeight * 0.3} initialLeft={window.innerWidth * 0.8}>Freelancer</BouncingBall>
    </div>
  );
};

export default BouncingBallsContainer;
