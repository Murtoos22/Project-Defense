import React from 'react';
import { ReactComponent as LikeSVG } from '../../../../public/like.svg';

const Like = ({ height = '24', width = '24', fill = 'white' }) => (
    <LikeSVG height={height} width={width} fill={fill}/>
);

export default Like;
