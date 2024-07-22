import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';

const ProductCard = ({ product }) => {
    // {"availability":"yes","category":"Phone","company":"AMZ","discount":20,"id":1,"price":599,"productName":"Phone 1","rating":4.5}
    const { productName, price, discount, rating, availability, company, category, id } = product;

    return (
        <Card sx={{ width: 300, height: 400 }}>
            <Box height={200} bgcolor="grey.300" display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h4" color="textSecondary">Image</Typography>
            </Box>

            <CardContent>
                <Typography variant="h6" gutterBottom>{productName}</Typography>

                <Grid container alignItems="center" justifyContent="flex-start" spacing={1} mb={1}>
                    <Grid item>
                        <Typography variant="subtitle1" component="span" color="textPrimary">${price}</Typography>
                    </Grid>
                    {discount > 0 && (
                        <Grid item>
                            <Typography variant="body2" component="span" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                                ${price + (price * discount) / 100}
                            </Typography>
                        </Grid>
                    )}
                    {discount > 0 && (
                        <Grid item>
                            <Chip label={`-${discount}%`} size="small" color="secondary" />
                        </Grid>
                    )}
                </Grid>

                <Typography variant='body2'>company: {company}</Typography>
                <Typography variant='body2'>category: {category}</Typography>
                
                <Typography variant="body1" color={availability === 'yes' ? 'success' : 'error'}>
                    {availability === 'yes' ? 'Available' : 'Out of Stock'}
                </Typography>
            
                <Typography variant="body2" color="textSecondary">
                    Rating: {rating.toFixed(1)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
