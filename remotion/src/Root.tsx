import { Composition } from 'remotion';
import { HeroVideo } from './HeroVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroVideo"
      component={HeroVideo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
