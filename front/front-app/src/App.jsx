import Router from './components/router/Router';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserProvider';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
