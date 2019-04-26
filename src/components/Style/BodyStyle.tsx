import * as React from 'react';
import './index.less';

interface IProps {
    children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
    title: string;
    style?: any;
}

class BodyStyle extends React.Component<IProps, {}> {

    render() {
        const { style, title, children } = this.props;

        return (<div
            style={{
                ...style
            }}
        >
            <h3 className="style-body-title"><strong>{title}</strong></h3>
            {children}
        </div>)
    }
}

export default BodyStyle;

