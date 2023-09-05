import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} /> 
        <Route path="/product" element={<ProductPage />} /> 
        <Route path="/store" element={<ProductPage />} /> 
        <Route path="/about-us" element={<ProductPage />} /> 
        <Route path="/contact-us" element={<ProductPage />} /> 

        {/* <Route path="/" exact Component={Home} /> 
        <Route path="/product" exact Component={ProductPage} /> 
        <Route path="/store" exact Component={ProductPage} /> 
        <Route path="/about-us" exact Component={ProductPage} /> 
        <Route path="/contact-us" exact Component={ProductPage} />  */}
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;