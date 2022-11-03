import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { minWidth } from '@mui/system';
import item from './item.jpg'
export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 250, minWidth:250}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={item}
          alt="dress"
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            Red Dress
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
