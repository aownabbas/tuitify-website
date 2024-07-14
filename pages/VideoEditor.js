import React from 'react';
import Layout from '../components/layout/Layout';
import EditMediaModal from '../components/combine/vidoeedition/EditMediaModal';

const VideoEditor = () => {
  return (
    <Layout heading="Video Editor">
      <div style={{ height: '84vh' }}>
        <EditMediaModal />
      </div>
    </Layout>
  );
};

export default VideoEditor;
