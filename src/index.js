import dva from 'dva';
import './styles/index.scss';
import "antd/dist/antd.css";

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/workspace/command/project').default);
app.model(require('./models/workspace/command/analysis').default);
app.model(require('./models/workspace/map/mapstyle').default);
app.model(require('./models/workspace/map/mapstate').default);
app.model(require('./models/workspace/map/mapoption').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
