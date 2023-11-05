import { AppRouter } from './components/Router/Router';
import { AuthProvider } from '../src/context/AuthContext';
import '../src/styles/App.scss';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
