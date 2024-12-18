/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Text, Label } from '@primer/react';
import { INotebookContent } from '@jupyterlab/nbformat';
import { Session } from '@jupyterlab/services';
import { JupyterReactTheme } from '../theme';
import { OnSessionConnection } from '../state';
import { useJupyter } from '../jupyter';
import { Notebook, NotebookToolbar, CellSidebar, KernelDetective } from '../components';

import nbformat from './notebooks/NotebookExample1.ipynb.json';

const NotebookOnSessionConnection = () => {
  const { serviceManager } = useJupyter();
  const [sessions, setSessions] = useState<Array<Session.ISessionConnection>>([]);
  const onSessionConnection: OnSessionConnection = (session: Session.ISessionConnection | undefined) => {
    console.log('Received a Kernel Session.', session?.id, session?.kernel?.clientId);
    if (session) {
      setSessions(sessions.concat(session));
    }
  }
  return (
    <JupyterReactTheme>
      <Box as="h1">A Jupyter Notebook listening to Kernel Sessions</Box>
      <KernelDetective serviceManager={serviceManager}/>
      <Box>
        <Text as="h3">Kernel Sessions</Text>
      </Box>
      <Box>
        {sessions.map(session => {
          return (
            <Box key={session.id}>
              <Text><Label>Session</Label> {session.name} {session.id} <Label>Kernel</Label> clientId {session.kernel?.clientId} - id {session.kernel?.id}</Text>
            </Box>
          )
        })}
      </Box>
      <Notebook
        nbformat={nbformat as INotebookContent}
        id="notebook-on-kernel-connection-id"
        height="calc(100vh - 2.6rem)" // (Height - Toolbar Height).
        onSessionConnection={onSessionConnection}
        startDefaultKernel={true}
        cellSidebarMargin={120}
        CellSidebar={CellSidebar}
        Toolbar={NotebookToolbar}
      />
    </JupyterReactTheme>
  );
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);

root.render(<NotebookOnSessionConnection />);