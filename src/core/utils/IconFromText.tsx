import React from 'react';
import {Aperture, Archive, Book, Briefcase, Camera, GitHub, Heart, List, Tv, Users} from "react-feather";

function IconFromText({text}: {
    text: string;
}) {
    switch (text){
        case 'list':
            return (<List/>)
        case 'users':
            return (<Users/>)
        case 'tv':
            return (<Tv/>)
        case 'github':
            return (<GitHub/>)
        case 'briefcase':
            return (<Briefcase/>)
        case 'archive':
            return (<Archive/>)
        case 'aperture':
            return (<Aperture/>)
        case 'camera':
            return (<Camera/>)
        case 'heart':
            return (<Heart/>)
        case 'book':
            return (<Book/>)
        default:
            return <div/>
    }
}

export default IconFromText;

