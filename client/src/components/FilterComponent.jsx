import { TextField, Grid, Paper, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";

const BASE_URL='https://3cceys-5173.ocws.app/api'

const FilterComponent = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState(['All']);
    const [companies, setCompanies] = useState(['All']);

    useEffect(() => {
        axios.get(`${BASE_URL}/categories`)
            .then((res) => {
                const categoriesData = res.data.categories;
                setCategories(['All', ...categoriesData]);
            })
            .catch(err => console.error(err));

            axios.get(`${BASE_URL}/companies`)
            .then((res) => {
                const companiesData = res.data.companies;
                setCompanies(['All', ...companiesData]);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Box p={2}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel>Company</InputLabel>
                            <Select
                                value={filters.company}
                                onChange={(e) => {setFilters((prevFilters) => ({...prevFilters, 'company': e.target.value})) ; console.log(filters.company)}}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {companies.map((company, idx) => {
                                    return <MenuItem key={`company-${company.id || idx}`} value={company.name}>
                                        {company.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={filters.category}
                                onChange={(e) => {setFilters((prevFilters) => ({...prevFilters, 'category': e.target.value})) ; console.log(filters.category)}}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {categories.map((category, idx) => {
                                    return <MenuItem key={`category-${category.id || idx}`} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Top N Products"
                            type="number"
                            value={filters.topNProducts}
                            onChange={(e) => {
                                setFilters((prevFilters) => ({...prevFilters, 'topNProducts': e.target.value}))
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Min"
                            type="number"
                            value={filters.min}
                            onChange={(e) => {
                                setFilters((prevFilters) => ({...prevFilters, 'min': e.target.value}))
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Max"
                            type="number"
                            value={filters.max}
                            onChange={(e) => {
                                setFilters((prevFilters) => ({...prevFilters, 'max': e.target.value}))
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel>Availability</InputLabel>
                            <Select
                                value={filters.availability}
                                onChange={(e) => {
                                    setFilters((prevFilters) => ({...prevFilters, 'availability': e.target.value}))
                                }}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="yes">Available</MenuItem>
                                <MenuItem value="no">Unavailable</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    );
};

export default FilterComponent;
