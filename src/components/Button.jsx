import { Box, Card, CardActionArea } from '@mui/material'
import React from 'react'

const Button = ({children}) => {

    return (
        <Box
            component={Card}
            borderRadius={2}
            width={"fit-content"}
            // marginRight="15px"
            data-aos={'fade-up'}
            minWidth={"200px"}
            
        >
            <CardActionArea>
                {children}
            </CardActionArea>
        </Box>
    )
}

export default Button