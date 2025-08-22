import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import userEvent from '@testing-library/user-event';

interface RenderWithProviders {
  renderResult: RenderResult;
  history: MemoryHistory;
  user: UserEvent;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
): RenderWithProviders => {
  return {
    renderResult: render(
      <Router location={history.location} navigator={history}>
        {ui}{' '}
      </Router>,
    ),
    history,
    user: userEvent.setup(),
  };
};
