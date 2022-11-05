import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function MultiActionAreaCard({id, img, title}) {
  return (
    <Card sx={{ maxWidth: 270, minHeight:200}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="70%"
          image={img}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FavoriteBorderIcon/>
      </CardActions>
    </Card>
  );
}
