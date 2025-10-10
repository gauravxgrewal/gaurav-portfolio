import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    // Poori website ka background aur padding yahan set karo
    <div className="bg-gray-400 p-4 grid lg:grid-rows-10 lg:h-screen">
      {/* Header sabhi pages par dikhega */}
      <Header />
      
     <main className="row-span-10 mt-5">
        <Outlet />
      </main>

    </div>
  );
}

export default App;