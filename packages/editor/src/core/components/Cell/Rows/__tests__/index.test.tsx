import { render, screen } from '@testing-library/react';
import React from 'react';
import Component from '../index';
import { ReduxProvider } from '../../../../reduxConnect';
import { initialState } from '../../../../reducer';
import { createValue } from '../../../../utils/createValue';
import createStore from '../../../../store';

describe('components/Cell/Rows', () => {
  it('renders a single div', () => {
    const store = createStore(
      initialState(
        createValue(
          {
            id: 'editableId',
            rows: [
              {
                id: 'row0',
                cells: [
                  {
                    id: 'cell0',
                    plugin: 'foo',
                  },
                ],
              },
            ],
          },
          { cellPlugins: [], lang: 'en' }
        ),
        'en'
      )
    );

    render(
      <ReduxProvider store={store}>
        <Component nodeId="cell0" />
      </ReduxProvider>
    );

    const element = document.querySelectorAll('.react-page-cell-rows');
    expect(element).toHaveLength(1);
  });
});
