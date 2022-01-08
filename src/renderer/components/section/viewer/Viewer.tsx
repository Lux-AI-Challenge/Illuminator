import React, { useEffect } from 'react';
import Base from '../base';
import type { GridSectionProps } from '../groups';
import styles from './styles.scss';

interface ViewerProps extends GridSectionProps {
  html?: string;
}

const Viewer: React.FC<ViewerProps> = ({
  html,
  hStart,
  hEnd,
  vStart,
  vEnd,
}) => {
  console.log('GOT', html);
  useEffect(() => {}, []);
  return (
    <Base
      className={styles.viewer}
      hStart={hStart}
      hEnd={hEnd}
      vStart={vStart}
      vEnd={vEnd}
    >
      {/* <iframe
        src="/Users/stonetao/Desktop/Coding/Projects/aicompetitions/LuxAI/Illuminator/src/main/envs/rps/index.html"
        title="abc"
        style={{
          objectFit: 'contain',
          flexShrink: 1,
          aspectRatio: '1 / 1',
          background: 'red',
        }}
      /> */}
      {html ? (
        // <div dangerouslySetInnerHTML={{ __html: html }} />
        <iframe
          id="FileFrame"
          src="about:blank"
          srcDoc={html}
          title="Renderer"
          style={{
            objectFit: 'contain',
            flexShrink: 1,
            aspectRatio: '1 / 1',
            background: 'white',
          }}
        />
      ) : (
        'No renderer'
      )}
    </Base>
  );
};

export default Viewer;
