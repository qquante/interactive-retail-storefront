import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Surface.module.css';

type SurfaceElement = 'article' | 'aside' | 'div' | 'section';
export type SurfaceTone = 'paper' | 'strong' | 'dark';
export type SurfacePadding = 'none' | 'small' | 'medium' | 'large';

export type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: SurfaceElement;
  bordered?: boolean;
  children: ReactNode;
  padding?: SurfacePadding;
  tone?: SurfaceTone;
};

export function Surface({
  as: Component = 'div',
  bordered = false,
  children,
  className,
  padding = 'medium',
  tone = 'paper',
  ...props
}: SurfaceProps) {
  return (
    <Component
      {...props}
      className={`${styles.surface} ${className ?? ''}`}
      data-bordered={bordered}
      data-padding={padding}
      data-tone={tone}
    >
      {children}
    </Component>
  );
}

export type CardProps = Omit<SurfaceProps, 'as'> & {
  as?: Extract<SurfaceElement, 'article' | 'div' | 'section'>;
};

export function Card({ as = 'article', bordered = true, ...props }: CardProps) {
  return <Surface {...props} as={as} bordered={bordered} />;
}
