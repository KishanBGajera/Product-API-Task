import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";


const BASE_URL='https://3cceys-5173.ocws.app/api'

const ProductDisplay = ({ filters }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/products?availability=yes`)
            .then((res) => {
                const productsData = res.data;
                setProducts(productsData);
            });
    }, []);

    useEffect(() => {
        if (filters.company == 'All' && filters.category == 'All') {
            axios.get(`${BASE_URL}/products?availability=${filters.availability}&min=${filters.min}&max=${filters.max}`)
                .then((res) => {
                    const productsData = res.data;
                    setProducts(productsData);
                });
        }

        else if (filters.company == 'All' && filters.category != 'All') {
            axios.get(`${BASE_URL}/categories/${filters.category}?availability=${filters.availability}&min=${filters.min}&max=${filters.max}`)
                .then((res) => {
                    const productsData = res.data;
                    setProducts(productsData);
                });
        }

        else if (filters.company != 'All' && filters.category == 'All') {
            axios.get(`${BASE_URL}/companies/${filters.company}?availability=${filters.availability}&min=${filters.min}&max=${filters.max}`)
                .then((res) => {
                    const productsData = res.data;
                    setProducts(productsData);
                });
        }

        else if (filters.company != 'All' && filters.category != 'All') {
            axios.get(`${BASE_URL}/companies/${filters.company}/categories/${filters.category}?availability=${filters.availability}&min=${filters.min}&max=${filters.max}`)
                .then((res) => {
                    const productsData = res.data;
                    setProducts(productsData);
                });
        }
    }, [filters]);

    return (
        <div className="flex flex-wrap">
            {products.map((product) =>
                <div className="ml-10 mb-10">
                    <ProductCard key={product.id} product={product} />
                </div>
            )}
        </div>
    );
}

export default ProductDisplay;
