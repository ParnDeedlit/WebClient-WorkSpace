import * as React from "react";
import { connect } from "dva";

import {
  IComponentAsProps,
  IComponentAs
} from "office-ui-fabric-react/lib/Utilities";
import {
  CommandBar,
  ICommandBarItemProps
} from "office-ui-fabric-react/lib/CommandBar";
import { InfoBubble } from "../Bubble/InfoBubble";
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

interface IProps {
  content: any;
  dispatch: any;
}

interface IState {
  id: number;
}

class ExtendManager extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: 1
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
         /*  overflowButtonProps={{
            ariaLabel: 'More commands',
            menuProps: {
              items: [], // Items must be passed for typesafety, but commandBar will determine items rendered in overflow
              isBeakVisible: true,
              beakWidth: 20,
              gapSpace: 10,
              directionalHint: DirectionalHint.topCenter
            }
          }} */
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
         /*  farItems={this.getFarItems()} */
          ariaLabel={
            "Use left and right arrow keys to navigate between commands"
          }
        />
      </div>
    );
  }

  // Data for CommandBar
  private getItems = () => {
    return [];
  };

  private getOverlflowItems = () => {
    return [];
  };

  private getFarItems = () => {
    const customCommand: IComponentAs<ICommandBarItemProps> = (
      props: IComponentAsProps<ICommandBarItemProps>
    ) => {
      return (
        <InfoBubble
          {...props}
        />
      );
    };
    return [
      {
        key: "tile",
        name: "拓展管理器",
        ariaLabel: "extend",
        iconProps: {
          iconName: "Tiles"
        },
        iconOnly: false,
        renderedInOverflow: false,
        commandBarButtonAs: customCommand,
        onClick: () => console.log("Tiles")
      },
      {
        key: "info",
        name: "其他信息",
        ariaLabel: "info",
        iconProps: {
          iconName: "Info"
        },
        iconOnly: true,
        onClick: () => console.log("Info")
      }
    ];
  };
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    content: state.content
  };
}

export default connect(mapStateToProps)(ExtendManager);
