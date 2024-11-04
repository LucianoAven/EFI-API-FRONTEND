import { Box, Typography } from '@mui/material'
import React from 'react'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const HomeButton = (props) => {

    return (
        <Button >
            <Box display={'flex'} flexDirection={'column'} justifyContent="center" alignItems={"center"}
                padding={2} sx={{ color: theme => theme.palette.text.primary }}
            >
                <Box marginBottom={4}>
                    {props.icon} 
                </Box>
                <Typography variant="h6">{props.titulo}</Typography>
            </Box>
        </Button>
    )
}

export default HomeButton