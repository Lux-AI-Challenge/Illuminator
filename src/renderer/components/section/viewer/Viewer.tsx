import React, { useEffect } from 'react';
import { useEnvContext } from 'renderer/context/env';
import styles from './styles.scss';

interface ViewerProps {}

const Viewer: React.FC<ViewerProps> = (props) => {
  const { html, setIframe } = useEnvContext();
  console.log('GOT', html);
  useEffect(() => {
    const iframe = document.getElementById('FileFrame') as HTMLIFrameElement;
    setIframe(iframe);
    console.log('SET IFRAME');
  }, [html, setIframe]);

  return (
    <>
      {!html ? (
        'No renderer'
      ) : (
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
      )}
    </>
  );
};

export default Viewer;
