import 'preact/devtools';
import { h, render } from 'preact';

import './styles/style.css';

import layouts from './source.json';

/*
  ┌───────────────────────────────────────────────────────────────────────┐
  │                            Whole Enchilada                            │
  │ ┌───────────────────────────────────────────────────────────────────┐ │
  │ │                          Layout/Section                           │ │
  │ │ ┌───────────────────────────────────────────────────────────────┐ │ │
  │ │ │                            Region                             │ │ │
  │ │ │                                                               │ │ │
  │ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
  │ │ │ │                           Block                           │ │ │ │
  │ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
  │ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
  │ │ │ │                           Block                           │ │ │ │
  │ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
  │ │ └───────────────────────────────────────────────────────────────┘ │ │
  │ │ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │ │
  │ │ │      Region       │ │      Region       │ │      Region       │ │ │
  │ │ │                   │ │                   │ │                   │ │ │
  │ │ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ │
  │ │ │ │     Block     │ │ │ │     Block     │ │ │ │     Block     │ │ │ │
  │ │ │ └───────────────┘ │ │ └───────────────┘ │ │ └───────────────┘ │ │ │
  │ │ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ │
  │ │ │ │     Block     │ │ │ │     Block     │ │ │ │     Block     │ │ │ │
  │ │ │ └───────────────┘ │ │ └───────────────┘ │ │ └───────────────┘ │ │ │
  │ │ └───────────────────┘ └───────────────────┘ └───────────────────┘ │ │
  │ │ ┌───────────────────────────────────────────────────────────────┐ │ │
  │ │ │                            Region                             │ │ │
  │ │ │                                                               │ │ │
  │ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
  │ │ │ │                           Block                           │ │ │ │
  │ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
  │ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
  │ │ │ │                           Block                           │ │ │ │
  │ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
  │ │ └───────────────────────────────────────────────────────────────┘ │ │
  │ └───────────────────────────────────────────────────────────────────┘ │
  └───────────────────────────────────────────────────────────────────────┘
*/

const AddBlock = () => (
  <div class="add-block">
    <a
      className="use-ajax"
      data-dialog-renderer="off_canvas"
      data-dialog-type="dialog"
      href="/layout_builder/choose/block/node/1/2/top">Add Block</a>
  </div>
);

const BlockWrapper = ({ ...props }) => (
  <div dangerouslySetInnerHTML={{ __html: props.blockData.html }}></div>
);

const Region = ({ ...props }) => (
  <div
    className={`layout-builder--layout__region layout__region layout__region--${props.regionName} ui-sortable`}
    data-region={props.regionName}>
      <AddBlock />
      {Object.keys(props.blocks).map(blockID => (<BlockWrapper
        key={blockID}
        blockData={props.blocks[blockID]}/>))}
  </div>
);

const LayoutWrapper = ({ ...props }) => (
  <div className="layout-section">
    <a
      className="use-ajax remove-section"
      data-dialog-renderer="off_canvas"
      data-dialog-type="dialog"
      href>
      Remove section</a>
    <div
      className={`layout-builder--layout layout ${props.layoutDefinition.template}`}
      data-layout-delta
      data-layout-update-url>
        {props.layoutDefinition.region_names.map(region => (<Region
          key={`region-${region}`}
          regionName={region}
          blocks={{ ...props.blocks[region] }}/>))}
      </div>
  </div>
);

const AppContainer = () => (
  <div id="layout-builder fart">
    {layouts.map(({ layout, layout_definition, section }) => (<LayoutWrapper
      key={layout}
      layoutDefinition={{ ...layout_definition }} // eslint-disable-line camelcase
      blocks={{ ...section }}/>))}
  </div>
);

render(<AppContainer/>, document.getElementById('example'));
