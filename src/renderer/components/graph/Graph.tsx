import React from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './styles.scss';

// recharts does not expose this publicly :(
type DataKey<T=$TSFIXME> = string | number | ((obj: T) => any);

interface GraphProps {
  data: $TSFIXME[];
  series: Array<{
    key: DataKey;
  }>;
}

const Graph = ({ data, series }: GraphProps): JSX.Element => {
  return (
    <div className={styles.graph}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {series.map(({ key }) => (
            <Line type="monotone" dataKey={key} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
