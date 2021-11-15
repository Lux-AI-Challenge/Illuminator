export const hGroups = {
  0: 'left',
  1: 'left-center',
  2: 'right-center',
  3: 'right',
};
export const vGroups = {
  0: 'top',
  1: 'top-middle',
  2: 'bottom-middle',
  3: 'bottom',
};

export interface GridSectionProps {
  hStart: keyof typeof hGroups;
  hEnd: keyof typeof hGroups;
  vStart: keyof typeof vGroups;
  vEnd: keyof typeof vGroups;
}
