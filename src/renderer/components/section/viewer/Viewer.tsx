import React from 'react';
import Control from 'renderer/components/Control';
import Base from '../base';
import type { GridSectionProps } from '../groups';
import styles from './styles.scss';

interface ViewerProps extends GridSectionProps {}

const Viewer: React.FC<ViewerProps> = ({ hStart, hEnd, vStart, vEnd }) => {
  return (
    <Base
      className={styles.viewer}
      hStart={hStart}
      hEnd={hEnd}
      vStart={vStart}
      vEnd={vEnd}
    >
      {/* <iframe
        src=""
        title=""
        style={{
          objectFit: 'contain',
          flexShrink: 1,
          aspectRatio: '1 / 1',
          background: 'red',
        }}
      /> */}
      <Control />
    </Base>
  );
};

export default Viewer;
