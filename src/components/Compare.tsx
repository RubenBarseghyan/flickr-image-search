import React from 'react';
import { Modal, Row, Col } from 'antd';
import { Photo } from '../api/flickr';

interface CompareProps {
  image1?: Photo;
  image2?: Photo;
  visible: boolean;
  onCancel: () => void;
}

const Compare: React.FC<CompareProps> = ({ image1, image2, visible, onCancel }) => {
  if (!image1 || !image2) return null;

  return (
    <Modal
      title="Compare Images"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Row gutter={16}>
        <Col span={12}>
          <img
            src={`https://live.staticflickr.com/${image1.server}/${image1.id}_${image1.secret}_w.jpg`}
            alt={image1.title}
            style={{ width: '100%' }}
          />
          <h3>{image1.title}</h3>
          <p>Tags: {image1.tags}</p>
        </Col>
        <Col span={12}>
          <img
            src={`https://live.staticflickr.com/${image2.server}/${image2.id}_${image2.secret}_w.jpg`}
            alt={image2.title}
            style={{ width: '100%' }}
          />
          <h3>{image2.title}</h3>
          <p>Tags: {image2.tags}</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default Compare;
