import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './components/App/App';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
