import React from 'react';
import Viewer from 'renderer/components/section/viewer';
import Base from 'renderer/components/section/base';

import styles from './styles.scss';

const Illuminator = () => {
  return (
    <div className={styles.grid}>
      <Base hStart={0} hEnd={1} vStart={0} vEnd={2} />
      <Viewer hStart={1} hEnd={2} vStart={0} vEnd={2} />
      <Base hStart={2} hEnd={3} vStart={0} vEnd={1} />
      <Base hStart={2} hEnd={3} vStart={1} vEnd={2} />
      <Base hStart={0} hEnd={1} vStart={2} vEnd={3} />
      <Base hStart={1} hEnd={3} vStart={2} vEnd={3} />
    </div>
  );
};

export default Illuminator;
