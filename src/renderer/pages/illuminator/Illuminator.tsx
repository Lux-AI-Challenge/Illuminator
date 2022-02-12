/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Viewer from 'renderer/components/section/viewer';
import Base, { BaseProps } from 'renderer/components/section/base';
import { GridSectionProps } from 'renderer/components/section/groups';
import Graph from 'renderer/components/graph';
import SelectModule from 'renderer/components/SelectModule';
import { useEnvContext } from 'renderer/context/env';
import styles from './styles.scss';

const TopLeft = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={0} hEnd={1} vStart={0} vEnd={2} {...props} />
);
const TopRight = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={2} hEnd={3} vStart={0} vEnd={1} {...props} />
);
const MidRight = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={2} hEnd={3} vStart={1} vEnd={2} {...props} />
);
const BotLeft = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={0} hEnd={1} vStart={2} vEnd={3} {...props} />
);
const BotRight = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={1} hEnd={3} vStart={2} vEnd={3} {...props} />
);
const Center = (props: Omit<BaseProps, keyof GridSectionProps>) => (
  <Base hStart={1} hEnd={2} vStart={0} vEnd={2} {...props} />
);

const Illuminator = () => {
  const { replayData } = useEnvContext();
  return (
    <div className={styles.grid}>
      <TopLeft>
        <SelectModule />
      </TopLeft>
      <Center className={styles.viewer}>
        <Viewer />
      </Center>
      <TopRight>
        <Graph
          data={replayData}
          series={[
            { key: (x) => x.data.player_0?.info?.score ?? 0 },
            { key: (x) => x.data.player_1?.info?.score ?? 0 },
          ]}
        />
      </TopRight>
      <MidRight>
        <SelectModule />
      </MidRight>
      <BotLeft>
        <SelectModule />
      </BotLeft>
      <BotRight>
        <SelectModule />
      </BotRight>
    </div>
  );
};

export default Illuminator;
