import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import path from 'path-browserify';
import styles from './index.scss';

/**
 * Component for selecting agents from a file system
 */
const SelectAgents = ({
  onAgentsChange,
}: {
  onAgentsChange: (data: { agents: string[] }) => void;
}) => {
  /**
   * Select environment file and also setup renderer
   */
  const [agents, setAgents] = useState<Array<string>>([]);
  const selectAgent = async () => {
    const filepath = await window.electron.system.fileSelect({
      title: 'Agent file',
      message: 'Select agent entry file',
      properties: ['openFile'],
      filters: [
        { name: 'All files', extensions: ['*'] },
        { name: 'Python files', extensions: ['py'] },
      ],
    });
    if (filepath) {
      const newAgents = [...agents, filepath];
      setAgents(newAgents);
      onAgentsChange({
        agents: newAgents,
      });
    }
  };
  const removeAgent = (key: string) => {
    const idx = parseInt(key.split('_')[0], 10);
    const newAgents = [...agents];
    newAgents.splice(idx, 1);
    setAgents(newAgents);
  };
  return (
    <div className={styles.SelectAgents}>
      <Typography variant="h5">Select Agents</Typography>
      <List dense className={styles['agent-list']}>
        {agents.map((agent, idx) => {
          const baseName = path.basename(agent);
          const key = `${idx}_${baseName}`;
          return (
            <ListItem
              className={styles['agent-list-item']}
              key={key}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    removeAgent(key);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={baseName} />
            </ListItem>
          );
        })}
        <ListItem
          className={`${styles['agent-list-item']}
            ${styles['agent-list-add']}`}
          secondaryAction={
            <IconButton edge="end" aria-label="addAgent" onClick={selectAgent}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemText primary="Add Agent" />
        </ListItem>
      </List>
    </div>
  );
};
export default SelectAgents;
