/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Viewer from 'renderer/components/section/viewer';
import Base, { BaseProps } from 'renderer/components/section/base';
import { GridSectionProps } from 'renderer/components/section/groups';
import Graph from 'renderer/components/graph';
import SelectModule, { ModuleInfo } from 'renderer/components/SelectModule';
import { useEnvContext } from 'renderer/context/env';
import { useUserContext } from 'renderer/context/user';
import MatchRunner from 'renderer/components/MatchRunner';
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
const modulesRegistry: Record<string, $TSFIXME> = {
  MatchRunner,
  TournamentRunner: MatchRunner,
};
// save dashboard layout
const getCurrentDashboardLayout = (modules: ModuleInfo[]) => {
  const layout: Array<string | null> = [];
  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i];
    if (module !== null) layout.push(module.name);
    else layout.push(module);
  }
  return layout;
};
const getDashboardModules = (layout: Array<string | null>) => {
  const newModules: Array<ModuleInfo> = [];
  layout.forEach((v) => {
    if (v !== null) newModules.push({ name: v, component: modulesRegistry[v] });
    else newModules.push(v);
  });
  return newModules;
};
const Illuminator = () => {
  const { replayData } = useEnvContext();
  const { userPreferences, setUserPreferences } = useUserContext();

  const [modules, setModules] = useState<Array<ModuleInfo>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const moduleOptions: ModuleInfo[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const k of Object.keys(modulesRegistry)) {
    moduleOptions.push({ name: k, component: modulesRegistry[k] });
  }

  useEffect(() => {
    if (userPreferences.dashboardLayout) {
      if (userPreferences.dashboardLayout.length === 0) {
        setUserPreferences({
          dashboardLayout: getCurrentDashboardLayout(modules),
        });
      } else {
        setModules(getDashboardModules(userPreferences.dashboardLayout));
      }
    }
  }, [userPreferences]);
  const onModuleChange = (moduleId: number, data: ModuleInfo) => {
    const newModules = [...modules];
    newModules[moduleId] = data;
    setModules(newModules);
    setUserPreferences({
      dashboardLayout: getCurrentDashboardLayout(newModules),
    });
  };
  const generateModuleComponent = (id: number) => {
    return (
      <SelectModule
        moduleOptions={moduleOptions}
        module={modules[id]}
        onModuleChange={(data) => {
          onModuleChange(id, data);
        }}
      />
    );
  };
  // TODO: make layout variable!
  return (
    <div className={styles.grid}>
      <TopLeft>{generateModuleComponent(0)}</TopLeft>
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
      <MidRight>{generateModuleComponent(1)}</MidRight>
      <BotLeft>{generateModuleComponent(2)}</BotLeft>
      <BotRight>{generateModuleComponent(3)}</BotRight>
    </div>
  );
};

export default Illuminator;
