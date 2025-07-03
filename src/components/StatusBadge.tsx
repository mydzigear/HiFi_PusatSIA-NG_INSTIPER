import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending';
  text: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, text, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const statusConfig = {
    success: {
      className: 'status-success',
      icon: CheckCircle
    },
    warning: {
      className: 'status-warning',
      icon: AlertCircle
    },
    error: {
      className: 'status-error',
      icon: XCircle
    },
    info: {
      className: 'status-info',
      icon: CheckCircle
    },
    pending: {
      className: 'bg-gray-100 text-gray-800 border border-gray-200',
      icon: Clock
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.className} ${sizeClasses[size]}`}>
      {showIcon && <Icon className={iconSizes[size]} />}
      {text}
    </span>
  );
}