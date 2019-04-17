import dva from 'dva';

import "antd/dist/antd.less";
import './styles/index.scss';
import './styles/antd_custom.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/workspace/command/project').default);
app.model(require('./models/workspace/command/analysis').default);

app.model(require('./models/workspace/map/mapdocument').default);
app.model(require('./models/workspace/map/mapstyle').default);
app.model(require('./models/workspace/map/mapstate').default);
app.model(require('./models/workspace/map/mapoption').default);

app.model(require('./models/workspace/layout/layoutstate').default);
app.model(require('./models/workspace/layout/layoutkey').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
