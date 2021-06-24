import { Status } from '../../model/DashboardModel';
import './Colors.module.scss';

export const useStatusColor = (status: Status | undefined): string => {
  switch (status) {
    case Status.Success: {
      return '#25C685';
    }
    case Status.Critical: {
      return '#FF565E';
    }
    case Status.Warning: {
      return '#FF8A34';
    }
    case Status.Unknown: {
      return '#475E69';
    }
    default: {
      return '#475E69';
    }
  }
};

export const useStatusClass = (status: Status | undefined): string => {
  switch (status) {
    case Status.Success: {
      return 'success';
    }
    case Status.Critical: {
      return 'critical';
    }
    case Status.Warning: {
      return 'warning';
    }
    case Status.Unknown: {
      return 'unknown';
    }
    default: {
      return 'unknown';
    }
  }
};
