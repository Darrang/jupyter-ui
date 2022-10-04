import { useDispatch } from "react-redux";
import { createRoot } from 'react-dom/client';
import { Box, Button, ButtonGroup } from '@primer/react';
import { IOutput, INotebookContent } from '@jupyterlab/nbformat';
import Jupyter from '../jupyter/Jupyter';
import { useJupyter } from '../jupyter/JupyterContext';
import Cell from '../components/cell/Cell';
import Notebook from '../components/notebook/Notebook';
import CellSidebarDefault from '../components/notebook/cell/sidebar/CellSidebarDefault';
import Output from "../components/output/Output";
import FileBrowser from "../components/filebrowser/FileBrowser";
import Console from "../components/console/Console";
import Terminal from "../components/terminal/Terminal";
import { selectCell, cellActions } from '../components/cell/CellState';
import { notebookActions } from '../components/notebook/NotebookState';
import notebookExample from './NotebookExample.ipynb.json';

import "./../../style/index.css";

const SOURCE_1 = '1+1'

const SOURCE_1_OUTPUTS: IOutput[] = [
  {
    "data": {
      "text/plain": [
        "2"
      ]
    },
    "execution_count": 1,
    "metadata": {},
    "output_type": "execute_result"
  }
];

const SOURCE_2 = `import ipywidgets as widgets
widgets.IntSlider(
    value=7,
    min=0,
    max=10,
    step=1
 )`

const CellPreview = () => {
  const cell = selectCell();
  return (
    <>
      <>source: {cell.source}</>
      <>kernel available: {String(cell.kernelAvailable)}</>
    </>
  )
}

const CellToolbar = () => {
  const cell = selectCell();
  const dispatch = useDispatch();
  return (
    <>
      <Box display="flex">
        <ButtonGroup>
          <Button
            variant="default"
            size="small"
            onClick={() => dispatch(cellActions.execute())}
          >
            Run the cell
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={() => dispatch(cellActions.outputsCount(0))}
          >
            Reset outputs count
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        Outputs count: {cell.outputsCount}
      </Box>
    </>
  );
}

const NotebookToolbar = () => {
  const dispatch = useDispatch();
  return (
    <Box display="flex">
      <ButtonGroup>
        <Button
          variant="default"
          size="small"
          onClick={() => dispatch(notebookActions.save.started(new Date()))}
        >
          Save the notebook
        </Button>
        <Button
          variant="default"
          size="small"
          onClick={() => dispatch(notebookActions.runAll.started())}
        >
          Run all
        </Button>
      </ButtonGroup>
    </Box>
  );
}

const Outputs = () => {
  const { kernel } = useJupyter();
  return (
    <>
      <Output
        showEditor={true}
        autoRun={false}
        kernel={kernel}
        code={SOURCE_1}
        outputs={SOURCE_1_OUTPUTS}
      />
      <Output
        showEditor={true}
        autoRun={false}
        kernel={kernel}
        code={SOURCE_2}
      />
      <Output
        showEditor={true}
        autoRun={true}
        kernel={kernel}
        code={SOURCE_2}
      />
    </>
  )
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(
  <Jupyter lite={false} terminals={true}>
    <Console />
    <hr />
    <CellPreview />
    <CellToolbar />
    <Cell />
    <hr />
    <Outputs />
    <hr />
    <div style={{maxWidth: '1000px'}}>
      <NotebookToolbar />
      <Notebook
        model={notebookExample as INotebookContent}
        CellSidebar={CellSidebarDefault}
      />
    </div>
    <hr />
    <FileBrowser />
    <hr />
    <Terminal />
  </Jupyter>
);