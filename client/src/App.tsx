import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

export const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
