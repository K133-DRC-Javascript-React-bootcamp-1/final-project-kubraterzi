import React, { useEffect } from "react";

import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import TableView from "../utilities/TableView";
import { fetchAllBrands } from "./../../redux/slices/brands/brandsSlice";
import { filterBySearchBar } from "../../helpers/filterBySearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const keys = ["brandName", "brandModel"];

const Brands = () => {
  const dispatch = useDispatch();
  const allBrands = useSelector((state) => state.brands.items);
  const [filteredSearch, setFilteredSearch] = React.useState("");
  const [seeMoreLinkVisibility, setSeeMoreLinkVisibility] =
    React.useState(true);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, []);

  useEffect(() => {
    setSeeMoreLinkVisibility(!pathname.includes("brands"));
  }, [navigate]);

  const navigateToBrands = () => {
    navigate("brands");
  };

  const filteredBrands = filterBySearchBar(keys, allBrands, filteredSearch);

  return (
    <TableView
      filteredSearch={filteredSearch}
      setFilteredSearch={setFilteredSearch}
    >
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <Typography component="h2" variant="h5" color="secondary" gutterBottom>
          Recent Title
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.15rem" }}>Brand</TableCell>
              <TableCell sx={{ fontSize: "1.15rem" }}>Brand Model</TableCell>
              <TableCell align="right">Buttons</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrands.map((brand) => (
              <TableRow key={brand.brandID}>
                <TableCell>{brand.brandName}</TableCell>
                <TableCell>{brand.brandModel}</TableCell>{" "}
                <TableCell align="right">Buttons</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {seeMoreLinkVisibility && (
          <Link
            color="secondary"
            onClick={navigateToBrands}
            sx={{ mt: 3, cursor: "pointer" }}
          >
            See more currently leased brands
          </Link>
        )}
      </Paper>
    </TableView>
  );
};

export default Brands;
