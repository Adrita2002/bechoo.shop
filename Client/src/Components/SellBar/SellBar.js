import * as React from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        main: '#251B37',
        contrastText: '#fff',
      },
      secondary: {
        main:"#9CFF2E",
        contrastText: '#251B37',
      }
    },
  })
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  padding:'5px 40px'
});

export default function BottomAppBar() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      
     
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} onClick={()=>navigate(`sellform`)}>
        <Toolbar>
          
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />Sell
          </StyledFab>
         
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </ThemeProvider>
  );
}
