import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';


function Header() {

    //const pathname = window.location.pathname;
    //const menuActive = pathname  === "/" ? "Home" : pathname;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {

            setAnchorElNav(event.currentTarget);
            console.log(event.currentTarget)
    };
    const handleCloseNavMenu = () => {
            setAnchorElNav(null);
    };
return (<AppBar position="static">
    <Container maxWidth="xl">
        <Toolbar disableGutters>
      
        <Box sx={{p:0.5 , ml:-3 , display: { xs: 'none', md: 'flex' } , position:"relative"}}>
            <Link to={"/"} style={{textDecoration:"none" , color:"#fff"}}>
               <Typography variant='h4'>logoDestop</Typography>
            </Link>
         </Box>
        <Box sx={{p:0.5 , display: { xs: 'flex', md: 'none' }}}>
            <Link to={"/"} style={{textDecoration:"none" , color:"#fff"}}>
                 <Typography variant='h6'>LogoMobile</Typography>
            </Link>
          </Box>

        <Box sx={{ flexGrow: 1 , display: { xs: 'flex', md: 'none' } }} justifyContent="flex-end" alignItems="center">
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', md: 'none' },
            }}
            >
            <Typography textAlign="center">Miratara TEST</Typography>
            </Menu>
        </Box>
       
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="center">

                  <Typography variant='h3' sx={{textAlign:'center'}}>Miratara TEST</Typography>  
                  
        </Box>
        </Toolbar>
    </Container>
    </AppBar>
  )
}

export default Header