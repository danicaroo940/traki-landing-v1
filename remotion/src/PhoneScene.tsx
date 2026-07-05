import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

const screens = [
  'screens/screenshot_1.png',
  'screens/screenshot_2.png',
  'screens/screenshot_3.png',
  'screens/screenshot_4.png',
];

export const PhoneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const per = 300 / screens.length; // frames per screen
  const index = Math.min(screens.length - 1, Math.floor(frame / per));
  const local = frame - index * per;
  const opacity = interpolate(local, [0, 12, per - 12, per], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: '#0A0A0B', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: 900, borderRadius: 60, overflow: 'hidden',
        border: '2px solid #39FF5C', boxShadow: '0 0 80px rgba(57,255,92,0.45)',
      }}>
        <Img src={staticFile(screens[index])} style={{ width: '100%', opacity }} />
      </div>
    </AbsoluteFill>
  );
};
