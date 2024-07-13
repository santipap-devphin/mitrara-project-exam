import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataContext from '../context/DataContext';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { MdPages } from "react-icons/md";

const Breacrumbs = ({page , slug=null}) => {

  const {styles}  = useContext(DataContext);

  return (<Grid sx={{ flexGrow: 1  ,pt:0}}>
            <Box
                sx={
                {
                    display: 'flex',
                    flexWrap: 'wrap',
                }
                }
                >
                        <Paper style={styles.paperOther} component={Stack} direction="column" justifyContent="center">
                        <Container>
                            <Stack 
                                direction="row" 
                                spacing={2}
                                divider={<Divider orientation="vertical" flexItem />}
                                >
                            <Typography variant='h3'>{page}</Typography>
                            </Stack>
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 2 }}
                                divider={<Divider orientation="vertical" flexItem />}
                                sx={{pt:2}}
                                >
                                <>
                                <Link to={"/"}
                                > 
                                    <Chip icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />} label="หน้าแรก" sx={{fontSize:22 , cursor:"pointer"}} />

                                </Link>
                                </>
                                <Typography
                                sx={{ display: 'flex', alignItems: 'center' , fontSize:22 }}
                                color="text.primary"
                                
                                >  
                                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                {page}
                                </Typography>

                                {
                                    slug !== null ?
                                    <Typography
                                    sx={{ display: 'flex', alignItems: 'center' , fontSize:22 }}
                                    color="text.primary"
                                    
                                    >  
                                    <MdPages style={{ marginRight: 5}} />
                                    {slug}
                                    </Typography>
                                    :null

                                }
                                
                            </Stack>

                        </Container>
                            
                        </Paper>
                    </Box>
                </Grid>
        )
}

export default Breacrumbs