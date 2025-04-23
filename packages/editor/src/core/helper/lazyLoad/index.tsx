/* eslint-disable prettier/prettier */
import type {
  ComponentType,
  ReactElement,
  ForwardedRef,
  PropsWithChildren,
  ComponentProps
} from 'react';
import React, {
  useEffect,
  useState,
  Suspense,
  forwardRef
} from 'react';
import { lazyWithPreload } from 'react-lazy-with-preload';

function useIsServer() {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  return isServer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoadableProps<T extends ComponentType<any>> = PropsWithChildren<
  React.ComponentProps<T> & {
    fallback?: ReactElement | null;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadable = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) => {
  const Component = lazyWithPreload(factory);

  const LoadableComponent = forwardRef<unknown, LoadableProps<T>>(
    ({ fallback = null, children, ...props }, ref: ForwardedRef<unknown>) => {
      const isServer = useIsServer();
      if (isServer) return fallback ?? null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Inner = Component as ComponentType<any>;
      return (
        <Suspense fallback={fallback}>
          <Inner ref={ref} {...props}>
            {children}
          </Inner>
        </Suspense>
      );
    }
  );

  return Object.assign(LoadableComponent, { load: Component.preload });
};


export default loadable;
