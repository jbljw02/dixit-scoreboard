import Dixit from './components/dixit';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Dixit />
    </Provider>
  )
}

export default App;
