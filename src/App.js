// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Payment } from './pages/payment/Payment';
import { Shoot } from './pages/shoot/Shoot';
import { ChoosePhotoFrame } from './pages/frame/ChoosePhotoFrame';
import { ChooseFilter } from './pages/filter/ChooseFilter';
import { QR } from './pages/qr/QR';


function App() {

  let bgurl = "https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png"

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ }> */}
            <Route index element={ <Home backgroundImageUrl={bgurl}/>} />
            <Route path="/payment" element={<Payment backgroundImageUrl={bgurl}/>} />
            <Route path="/choosephotoframe" element={<ChoosePhotoFrame backgroundImageUrl={bgurl}/>} />
            <Route path="/shoot" element={<Shoot backgroundImageUrl={bgurl}/>} />
            <Route path="/filter" element={<ChooseFilter backgroundImageUrl={bgurl}/>} />
            <Route path="/QR" element={<QR backgroundImageUrl={bgurl}/>} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
