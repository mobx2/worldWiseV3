import styles from "./CityList.module.css";

// =======================
// ======> Context <======
// =======================

import { useCities } from "../context/CitiesContext";

// =======================
// ======> Context <======
// =======================

import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
