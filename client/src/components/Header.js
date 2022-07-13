import { Toolbar, Typography, Button, IconButton, Box, Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';


function Header({currentUser,
                 isLoggedIn,
                handleOpenLogin,
                handleOpenSignup,
                handleLogout}) {
    
    return (<div>
        <AppBar>
        <Toolbar>
          <Typography 
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={"/"}>Wikiblog!</Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {!isLoggedIn ?
                <>
                    <Button sx={{ color: '#fff' }} onClick={handleOpenLogin}>
                        Login
                    </Button>
                    <Button sx={{ color: '#fff' }} onClick={handleOpenSignup}>
                        Sign up
                    </Button>
                </>
            :
                <>
                    <Button sx={{ color: '#fff' }} onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            }
          </Box>
          <Box>
          {!isLoggedIn ?
              <>
                <Avatar>?</Avatar>
              </>
            :
              <>
                <Link to={"/user/"+currentUser.id}><Avatar sx={{ bgcolor: deepPurple[500] }}/></Link>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </div>)
}

export default Header;