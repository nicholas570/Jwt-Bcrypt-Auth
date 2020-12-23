import Router from './components/router/Router';
import { UserProvider } from './context/userProvider';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
