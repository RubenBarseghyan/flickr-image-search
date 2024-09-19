import React from 'react';
import { Card, Button } from 'antd';
import { Photo } from '../api/flickr';

const { Meta } = Card;

interface ImageCardProps {
  photo: Photo;
  onFavorite: (photo: Photo) => void;
  isFavorite: boolean;
  onCompare?: (photo: Photo) => void;
  isSelected: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onFavorite, isFavorite, onCompare, isSelected }) => {
  return (
    <Card
      cover={<img alt={photo.title} src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} />}
      actions={[
        <Button key="favorite" onClick={() => onFavorite(photo)}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>,
        onCompare && (
          <Button key="compare" onClick={() => onCompare(photo)}>
            {isSelected ? 'Selected' : 'Compare'}
          </Button>
        )
      ]}
    >
      <Meta title={photo?.title} description={`Tags: ${photo?.tags}`} />
    </Card>
  );
};

export default ImageCard;
