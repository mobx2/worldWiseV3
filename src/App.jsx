import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContext";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  // console.log(cities);

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          {/* Logo Route */}
          <Route path="/" element={<Homepage />} />

          {/* Pricing Route */}
          <Route path="pricing" element={<Pricing />} />

          {/* Product Route */}
          <Route path="product" element={<Product />} />

          {/* Login Route */}
          <Route path="login" element={<Login />} />

          {/* Application Route */}
          <Route path="app" element={<AppLayout />}>
            {/* Application Nested Route (Index Cities) */}
            <Route index element={<Navigate replace to="cities" />} />

            <Route path="cities/:id" element={<City />} />

            {/* Application Nested Route (Cities) */}
            <Route path="cities" element={<CityList />} />

            <Route path="countries" element={<CountryList />} />

            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
