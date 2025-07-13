import { useEffect, useState } from "react";

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
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const BASE_URL = "http://localhost:9001";

function App() {
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);

        const data = await response.json();

        setCities(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // console.log(cities);

  return (
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
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />

          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />

          <Route path="form" element={<Form />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
