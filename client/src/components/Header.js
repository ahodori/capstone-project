import { Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';


function Header({currentUser,
                 isLoggedIn,
                handleOpenLogin,
                handleOpenSignup,
                handleLogout}) {
    
    return (<div>
        <AppBar component="nav">
        <Toolbar>
          <Typography 
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Wikiblog!
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
        </Toolbar>
      </AppBar>
    </div>)
}

export default Header;