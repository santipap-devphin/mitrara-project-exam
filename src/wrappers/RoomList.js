import React , {useState , useEffect} from 'react';
import {Box , Container} from "@mui/material";
import endpoint from '../api/endpoint';
import Grid from '@mui/material/Unstable_Grid2';
import CardRoom from '../component/CardRoom';



const RoomList = ({id , page}) => {

  const [roomType , setRoomType] = useState([]);
  const [statusCall , setStatusCall] = useState(false);
  

  useEffect(() => {

    let callStatus = true;

    const reqRoomType = async () => {

      try {
        const response = await endpoint.get("/gethotel/room/"+id);

        console.log(response.data)
       

        if(response.data.code === 1){

            if(response.data.lists.length > 0){

                setRoomType(response.data.lists);
                setStatusCall(true)

            }
      }
      } catch (error) {
        console.error(error)
      }


    }


    if(callStatus){

      reqRoomType();
    }

    return () => {

      callStatus = false;

    }


},[id])

  return (<Box
    sx={{
    display: 'flex',
    
    }}
    >
        <Container>
                <Grid container spacing={2} sx={{pt:"50px" , pb:"50px"}}>

                            {
                               statusCall ? 

                               roomType.map((vals , keys) => {


                                  return <Grid key={keys} item="true" md={4}>
                                             <CardRoom dataroomtype={vals} titlepage={page} />
                                        </Grid>
                               })

                               :null
                              
                            }
                           
                </Grid>
               
        </Container>
        </Box>
  )
}

export default RoomList