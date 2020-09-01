import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Task from '../pages/Task';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Task} />
    </Switch>
  );
}

export default Routes;
