import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/Layout/Layout';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { ErrorPage } from '@pages/ErrorPage/ErrorPage';

const BoardsPage = lazy(() => import('./pages/BoardsPage/BoardsPage'));
const BoardPage = lazy(() => import('./pages/BoardPage/BoardPage'));
const TasksPage = lazy(() => import('./pages/TasksPage/TasksPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />, // Специальный компонент-обертка
    children: [
      {
        index: true,
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
      {
        path: '404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
