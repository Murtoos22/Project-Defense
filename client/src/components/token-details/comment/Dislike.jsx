import React from 'react';
import { ReactComponent as DislikeSVG } from '../../../../public/dislike.svg';

const Dislike = ({ height = '24', width = '24', fill = 'white'}) => (
    <DislikeSVG height={height} width={width} fill={fill}/>
);

export default Dislike;
