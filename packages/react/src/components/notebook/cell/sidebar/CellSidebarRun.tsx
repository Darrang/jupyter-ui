/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useState } from 'react';
import { PanelLayout } from '@lumino/widgets';
import { Box, Button } from '@primer/react';
import { PlayIcon } from '@primer/octicons-react';
import useNotebookStore from '../../NotebookState';
import { ICellSidebarProps } from './CellSidebarWidget';
import { DATALAYER_CELL_SIDEBAR_CLASS_NAME } from './CellSidebarWidget';

export const CellSidebarRun = (props: ICellSidebarProps) => {
  const { notebookId } = props;
  const notebookStore = useNotebookStore();
  const [visible, setVisible] = useState(false);
  const activeCell = notebookStore.selectActiveCell(notebookId);
  const layout = activeCell?.layout;
  if (layout) {
    const cellWidget = (layout as PanelLayout).widgets[0];
    if (!visible && cellWidget?.node.id === props.cellNodeId) {
      setVisible(true);
    }
    if (visible && cellWidget?.node.id !== props.cellNodeId) {
      setVisible(false);
    }
  }
  if (!visible) {
    return <div></div>;
  }
  return activeCell ? (
    <Box
      className={DATALAYER_CELL_SIDEBAR_CLASS_NAME}
      sx={{
        '& p': {
          marginBottom: '0 !important',
        },
      }}
    >
      <Box>
        <Button
          trailingVisual={PlayIcon}
          size="small"
          variant="invisible"
          onClick={(e: any) => {
            e.preventDefault();
            notebookStore.run(notebookId);
          }}
        >
          Run
        </Button>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default CellSidebarRun;
