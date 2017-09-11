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

const AddSection = ({ ...props }) => (
  <div class="add-section">
    <a
      class="use-ajax"
      data-dialog-renderer="off_canvas"
      data-dialog-type="dialog"
      href={`/layout_builder/choose/section/node/1/${props.delta}`}>Add Section</a>
  </div>
);

const RemoveSection = ({ ...props }) => (
  <a
    className="use-ajax remove-section"
    data-dialog-renderer="off_canvas"
    data-dialog-type="dialog"
    href={`/layout_builder/remove/section/node/1/${props.delta}`}>
    Remove section</a>
);

const AddBlock = ({ ...props }) => (
  <div class="add-block">
    <a
      className="use-ajax"
      data-dialog-renderer="off_canvas"
      data-dialog-type="dialog"
      href={`/layout_builder/choose/block/node/1/${props.delta}/top`}>Add Block</a>
  </div>
);

const BlockWrapper = ({ ...props }) => (
  <div dangerouslySetInnerHTML={{ __html: props.blockData.html }}></div>
);

const Region = ({ ...props }) => (
  <div
    className={`layout-builder--layout__region layout__region layout__region--${props.regionName} ui-sortable`}
    data-region={props.regionName}>
      <AddBlock delta={props.delta} />
      {Object.keys(props.blocks).map(blockID => (<BlockWrapper
        key={blockID}
        blockData={props.blocks[blockID]}/>))}
  </div>
);

const LayoutWrapper = ({ ...props }) => (
  <div className="layout-section">
    <RemoveSection delta={props.delta} />
    <div
      className={`layout-builder--layout layout ${props.layoutDefinition.template}`}
      data-layout-delta={props.delta}
      data-layout-update-url="/layout_builder/move/block/node/1">
        {props.layoutDefinition.region_names.map(region => (<Region
          key={`region-${region}`}
          regionName={region}
          delta={props.delta}
          blocks={{ ...props.blocks[region] }}/>))}
      </div>
  </div>
);

const AppContainer = () => (
  <div id="layout-builder">
    {layouts.map(({ layout, layout_definition, section }, index) => (<LayoutWrapper
      key={layout}
      delta={index}
      layoutDefinition={{ ...layout_definition }} // eslint-disable-line camelcase
      blocks={{ ...section }}/>))}
  </div>
);

render(<AppContainer />, document.getElementById('example'));
