import { AbsoluteFill } from 'remotion';
import { PhoneScene } from './PhoneScene';

export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0B' }}>
      <PhoneScene />
    </AbsoluteFill>
  );
};
