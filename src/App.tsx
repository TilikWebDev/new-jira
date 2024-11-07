import React from 'react';
import { ModalProvider } from '@context/modals-context';
import { TasksProvider } from './context/tasks-context';
import Dashboard from './containers/dashboard';

function App() {
  return (
    <TasksProvider>
      <ModalProvider>
        <Dashboard />
      </ModalProvider>
    </TasksProvider>
  );
}

export default React.memo(App);
