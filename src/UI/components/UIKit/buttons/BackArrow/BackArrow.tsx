import React from 'react';
import {ArrowLeft} from "react-feather";
import {useNavigate} from "react-router-dom";
import IconButton from "../IconButton/IconButton";


function BackArrow() {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate(-1)}>
            <ArrowLeft/>
        </IconButton>
    );
};

export default BackArrow;

