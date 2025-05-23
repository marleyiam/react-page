// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React, {
  ComponentType,
  Fragment,
  PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';
import type JSONSchemaBridge from 'uniforms-bridge-json-schema';
import { useIsSmallScreen } from '../../core/components/hooks';
import lazyLoad from '../../core/helper/lazyLoad';
import loadable from '../../core/helper/lazyLoad';
import type { AutoFormProps } from 'uniforms';
import type { AutoFieldProps, AutoFieldsProps } from '../uniform-mui';

import type {
  AutoformControlsDef,
  CellPluginComponentProps,
  DataTType,
  JsonSchema,
} from '../../core/types';
import makeUniformsSchema from './makeUniformsSchema';

type OptionalFields =
  | 'autosaveDelay'
  | 'error'
  | 'label'
  | 'noValidate'
  | 'onValidate'
  | 'validate'
  | 'autosave';

type CustomAutoFormProps = PropsWithChildren<
  Omit<AutoFormProps<unknown>, OptionalFields> & Partial<AutoFormProps<unknown>>
>;

//export const AutoForm = lazyLoad(() => import('./AutoForm'));
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const AutoForm = loadable<ComponentType<CustomAutoFormProps>>(
  () => import('./AutoForm')
);
export const AutoField = lazyLoad<ComponentType<AutoFieldProps>>(
  () => import('./AutoField')
);

export const AutoFields = lazyLoad<ComponentType<AutoFieldsProps>>(
  () => import('./AutoFields')
);

const getDefaultValue = function (bridge: JSONSchemaBridge): {
  [key: string]: unknown;
} {
  return bridge.getSubfields().reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: bridge.getInitialValue(fieldName),
    }),
    {}
  );
};

type Props<T extends DataTType> = CellPluginComponentProps<T> &
  AutoformControlsDef<T>;
export function AutoformControls<T extends DataTType>(props: Props<T>) {
  const { onChange, data, schema, columnCount = 2, Content } = props;
  const bridge = useMemo(
    () => makeUniformsSchema<T>(schema as JsonSchema<T>),
    [schema]
  );
  useEffect(() => {
    const newDefaultData = {
      ...getDefaultValue(bridge),
      ...(data ?? {}),
    } as Partial<T>;
    onChange(newDefaultData);
  }, [bridge]);
  const isSmall = useIsSmallScreen();

  return (
    <AutoForm
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model={data as any}
      autosave={true}
      schema={bridge}
      onSubmit={onChange}
    >
      {Content ? (
        <Content {...props} columnCount={columnCount} />
      ) : (
        <div
          style={{
            columnCount: isSmall ? 1 : columnCount,
            columnRule: '1px solid #E0E0E0',
            columnGap: 48,
          }}
        >
          <AutoFields element={Fragment} />
        </div>
      )}
    </AutoForm>
  );
}
