import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Compare from '../components/Compare';
import { Photo } from '../api/flickr';

const Home: React.FC = () => {
  const [compareImages, setCompareImages] = React.useState<Photo[]>([]);
  const [compareVisible, setCompareVisible] = React.useState<boolean>(false);

  const handleCompare = (image1: Photo, image2: Photo) => {
    setCompareImages([image1, image2]);
    setCompareVisible(true);
  };

  return (
    <div>
      <ImageGallery onCompare={handleCompare} />
      <Compare
        image1={compareImages[0]}
        image2={compareImages[1]}
        visible={compareVisible}
        onCancel={() => setCompareVisible(false)}
      />
    </div>
  );
};

export default Home;
