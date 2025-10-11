import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { motion } from "framer-motion";

function App() {
  return (
    // Poori website ka background aur padding yahan set karo


      <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>


    <div className="bg-gray-400 p-4 grid lg:grid-rows-10 lg:h-screen">
      {/* Header sabhi pages par dikhega */}
      <Header />
      
     <main className="row-span-10 mt-5">
        <Outlet />
      </main>

    </div>

        </motion.section>
 
  );
}

export default App;