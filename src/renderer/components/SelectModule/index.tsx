import {
  Autocomplete,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import path from 'path-browserify';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import MatchRunner from 'renderer/components/MatchRunner';
import styles from './index.scss';

export type ModuleInfo = {
  name: string;
  component: $TSFIXME;
} | null;

/**
 * Component for selecting agents from a file system
 */
const SelectModule = ({
  module,
  onModuleChange,
  moduleOptions,
}: {
  module: ModuleInfo;
  moduleOptions: $TSFIXME[];
  onModuleChange: (data: ModuleInfo) => void;
}) => {
  /**
   * Select environment file and also setup renderer
   */
  // const [module, setModule] = useState<>(null);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.SelectModule}>
      {/* <Typography variant="h5">{module || 'Select Module'}</Typography> */}
      {module ? (
        <div>
          <div>
            <Typography variant="body1" style={{ display: 'inline' }}>
              {module.name}
            </Typography>
            <IconButton
              className={styles['remove-module']}
              style={{ color: 'white' }}
              onClick={() => {
                onModuleChange(null);
              }}
            >
              <CloseIcon className={styles['remove-module-close']} />
            </IconButton>
          </div>
          <module.component />
        </div>
      ) : (
        <div className={styles['add-module']}>
          <IconButton style={{ color: 'white' }} onClick={handleModalOpen}>
            <AddIcon />
          </IconButton>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Module from the dropdown list
          </Typography>
          <Autocomplete
            disablePortal
            options={moduleOptions}
            getOptionLabel={(option) => (option ? option.name : 'null')}
            sx={{ width: 300 }}
            onChange={(_, newValue) => {
              if (newValue) {
                onModuleChange({
                  name: newValue?.name,
                  component: newValue?.component,
                });
              }
            }}
            renderInput={(params) => {
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <TextField {...params} label="Module" />;
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default SelectModule;
