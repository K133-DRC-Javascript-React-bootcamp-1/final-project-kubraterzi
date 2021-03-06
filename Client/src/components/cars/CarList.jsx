import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import CarItemCard from "./CarItemCard";
import {
  fetchAllCars,
  fetchFilteredCars,
} from "./../../redux/slices/cars/carsSlice";
import Filter from "../utilities/Filter";
import { AppBar, Toolbar } from "@mui/material";
import { filterBySearchBar } from "../../helpers/filterBySearchBar";

const CarList = () => {
  const keys = ["brandName", "colorName", "brandModel", "dailyPrice"];

  const [filteredCars, setFilteredCars] = React.useState([]);
  const [filteredSearch, setFilteredSearch] = React.useState("");
  const selectedBrand = useSelector((state) => state.brands.currentBrand);
  const selectedColor = useSelector((state) => state.colors.currentColor);
  const selectedStatus = useSelector((state) => state.statuses.currentStatus);

  const filteredCarsBySearch = filterBySearchBar(
    keys,
    filteredCars,
    filteredSearch
  );

  useEffect(() => {
    if (selectedBrand === undefined && selectedColor === undefined) {
      const fetchData = async () => {
        const allCars = await fetchAllCars();
        setFilteredCars(allCars);
      };
      fetchData();
    } else {
      const colorId = selectedColor?.colorID;
      const brandId = selectedBrand?.brandID;
      const filters =
        brandId && colorId
          ? {
              brandId, // : iki tarafı da aynı olduğu için tek sefer yazmak yeterli/  brandId : brandId ile aynı
              colorId,
            }
          : brandId
          ? { brandId }
          : { colorId };

      const fetchData = async () => {
        const filteredCarsByBrand = await fetchFilteredCars(filters);
        setFilteredCars(filteredCarsByBrand);
      };
      fetchData();
    }
  }, [selectedBrand, selectedColor]);

  useEffect(() => {
    const fetchData = async () => {
      const filteredCarsByStatus = await fetchFilteredCars({
        status: selectedStatus,
      });
      setFilteredCars(filteredCarsByStatus);
    };
    fetchData();
  }, [selectedStatus]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Filter
            filteredSearch={filteredSearch}
            setFilteredSearch={setFilteredSearch}
            switcherVisibility={true}
          />{" "}
        </Toolbar>
      </AppBar>
      <div className="card-items">
        {filteredCarsBySearch.map((car) => (
          <CarItemCard key={car.carID} car={car} />
        ))}
      </div>
    </>
  );
};

export default CarList;
