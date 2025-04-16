import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/Layout/Layout';

const BoardsPage = lazy(() => import('./pages/BoardsPage/BoardsPage'));
const BoardPage = lazy(() => import('./pages/BoardPage/BoardPage'));
const TasksPage = lazy(() => import('./pages/TasksPage/TasksPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <BoardsPage />,
      },
      {
        path: 'boards',
        element: <BoardsPage />,
      },
      {
        path: 'board/:id',
        element: <BoardPage />,
      },
      {
        path: 'issues',
        element: <TasksPage />,
      },
    ],
  },
]);
