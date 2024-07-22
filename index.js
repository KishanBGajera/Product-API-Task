const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.get('/api/products', async (req, res) => {
    const availability = req.query.availability;
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    try {
        const response = await axios.get(`${BASE_URL}/products`);
        let products = response.data;
        if(availability == 'yes') {
            products = products.filter(product => product.availability === 'yes');
        }

        if(availability == 'no') {
            products = products.filter(product => product.availability === 'no');
        }

        if(min) {
            products = products.filter(product => product.price >= min);
        }

        if(max) {
            products = products.filter(product => product.price <= max);
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        const categories = response.data;
        res.json({
            categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/categories/:category', async (req, res) => {
    const category = req.params.category;

    const availability = req.query.availability;
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    try {
        const response = await axios.get(`${BASE_URL}/products`);

        let products = response.data;
        if(availability == 'yes') {
            products = products.filter(product => product.availability === 'yes');
        }

        if(availability == 'no') {
            products = products.filter(product => product.availability === 'no');
        }

        if(min) {
            products = products.filter(product => product.price >= min);
        }

        if(max) {
            products = products.filter(product => product.price <= max);
        }

        const result = products.filter(product => product.category == category);

        res.json(result);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/companies', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`);
        const companies = response.data;
        res.json({
            companies
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/companies/:company', async (req, res) => {
    const company = req.params.company;

    const availability = req.query.availability;
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    try {
        const response = await axios.get(`${BASE_URL}/products`);

        let products = response.data;
        res.json(products);
        if(availability == 'yes') {
            products = products.filter(product => product.availability === 'yes');
        }

        if(availability == 'no') {
            products = products.filter(product => product.availability === 'no');
        }

        if(min) {
            products = products.filter(product => product.price >= min);
        }

        if(max) {
            products = products.filter(product => product.price <= max);
        }

        const result = products.filter(product => product.company == company);

        res.json(result);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/companies/:company/categories/:category', async (req, res) => {
    const company = req.params.company;
    const category = req.params.category;

    const availability = req.query.availability;
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    try {
        const response = await axios.get(`${BASE_URL}/products`);
        let products = response.data;
        if(availability == 'yes') {
            products = products.filter(product => product.availability == 'yes');
        }

        if(availability == 'no') {
            products = products.filter(product => product.availability == 'no');
        }

        if(min) {
            products = products.filter(product => product.price >= min);
        }

        if(max) {
            products = products.filter(product => product.price <= max);
        }

        const result = products.filter(product => product.company == company && product.category == category);

        res.json(result);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});