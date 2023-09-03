// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Payment } from './pages/payment/Payment';
import { Shoot } from './pages/shoot/Shoot';
import { ChoosePhotoFrame } from './pages/frame/ChoosePhotoFrame';
import { ChooseFilter } from './pages/filter/ChooseFilter';
import { QR } from './pages/qr/QR';
import {Coupon} from './pages/payment/Coupon'


function App() {

  let pathurl = "https://photobooth-kiosk-image-internal124714-staging.s3.ap-southeast-2.amazonaws.com/COMPONENT-IMAGE/"
  


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ }> */}
            <Route index element={ <Home pathurl={pathurl}/>} />
            <Route path="/payment" element={<Payment pathurl={pathurl}/>} />
            <Route path="/coupon" element={<Coupon pathurl={pathurl}/>} />
            <Route path="/choosephotoframe" element={<ChoosePhotoFrame pathurl={pathurl}/>} />
            <Route path="/shoot" element={<Shoot pathurl={pathurl}/>} />
            <Route path="/filter" element={<ChooseFilter pathurl={pathurl}/>} />
            <Route path="/QR" element={<QR pathurl={pathurl}/>} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
