import { Flex, Spin } from 'antd';
import { type CSSProperties } from 'react';
import { cn } from '@/utils/helpers';

export interface LoadingProps {
  type?: 'page' | 'default';
  tip?: string;
  className?: string;
  style?: CSSProperties;
}

export const Loading = ({ type = 'default', tip, className, style }: LoadingProps) => {
  const isPage = type === 'page';

  if (isPage) {
    return (
      <Flex
        align="center"
        justify="center"
        className={cn(className)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(4px)',
          ...style,
        }}
      >
        <Spin size="large" tip={tip} />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      className={cn(className)}
      style={{
        width: '100%',
        minHeight: '100px',
        ...style,
      }}
    >
      <Spin size="large" tip={tip} />
    </Flex>
  );
};

Loading.displayName = 'Loading';
