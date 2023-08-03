import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { productsApiSlice } from './slices/productsApiSlice';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/SideBar';


function App() {
  return (
    <>
    <Header/>
    {/* <Sidebar/> */}
    <main className="py-3">
      <Container>
      <Outlet/>
      <Footer/>
      </Container>
      </main>
    <ToastContainer />
    </>
  )
}

export default App
