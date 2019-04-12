import * as React from "react";

import {
  CommandBarButton,
  IButtonProps
} from "office-ui-fabric-react/lib/Button";
import { TeachingBubble } from "office-ui-fabric-react/lib/TeachingBubble";

export interface IInfoBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class InfoBubble extends React.Component<{}, IInfoBubbleState> {
  private _menuButtonElement: HTMLElement | undefined;

  constructor(props: {}) {
    super(props);

    this._onDismiss = this._onDismiss.bind(this);
    this._onShow = this._onShow.bind(this);

    this.state = {
      isTeachingBubbleVisible: false
    };
  }

  public render(): JSX.Element {
    const { ...buttonProps } = this.props;
    const { isTeachingBubbleVisible } = this.state;
    const examplePrimaryButton: IButtonProps = {
      children: "试一试"
    };
    const exampleSecondaryButtonProps: IButtonProps = {
      children: "以后提醒我",
      onClick: this._onDismiss
    };

    return (
      <div className="ms-TeachingBubbleExample">
        <CommandBarButton
          {...buttonProps}
          ref={menu => (this._menuButtonElement = menu ? menu : undefined)}
          onClick={isTeachingBubbleVisible ? this._onDismiss : this._onShow}
          text={isTeachingBubbleVisible ? "拓展管理器" : "拓展管理器"}
        />
        {isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              targetElement={this._menuButtonElement}
              primaryButtonProps={examplePrimaryButton}
              secondaryButtonProps={exampleSecondaryButtonProps}
              onDismiss={this._onDismiss}
              headline="拓展管理器"
            >
              拓展管理器类似MapGIS
              K10桌面的插件管理器，任何满足插件规范的插件都可以插入到整个工作环境中！
            </TeachingBubble>
          </div>
        ) : null}
      </div>
    );
  }

  private _onDismiss(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: false
    });
  }

  private _onShow(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: true
    });
  }
}
