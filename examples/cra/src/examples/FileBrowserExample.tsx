import {render} from 'react-dom';
import {Jupyter, FileBrowser, FileManagerJupyterLab} from '@datalayer/jupyter-react';
import Layers from './../layout/Layers';

import './../App.css';

const div = document.createElement('div');
document.body.appendChild(div);

render(
  <Jupyter collaborative={false} terminals={false}>
    <Layers />
    <Jupyter collaborative={false} terminals={true}>
      <FileBrowser />
      <FileManagerJupyterLab />
    </Jupyter>
  </Jupyter>,
  div
);
