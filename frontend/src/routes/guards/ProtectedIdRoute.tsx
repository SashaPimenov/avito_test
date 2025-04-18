import { ROUTES } from '@constants/routes';
import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

interface IProps {
  requireValidId?: boolean;
}

const ProtectedIdRoute: React.FC<IProps> = ({ requireValidId = false }) => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : NaN;

  if (requireValidId && (isNaN(numericId) || numericId <= 0)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return <Outlet />;
};

export default ProtectedIdRoute;
