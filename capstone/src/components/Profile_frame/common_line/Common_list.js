
import React, { Component } from 'react';
import {Common_line_card } from './Common_line_card';
import {useSelector} from 'react-redux';
import { get_files } from '../../../collection_func'


export const Common_list = () => {


  const libraryArr = get_files( `../../../../../media/`, useSelector(state => state.allItems).items);

  return (
    <div>
    { libraryArr.map((n,i) => (<div key={i}> <Common_line_card fileInfoObj={n} /></div> )) }
   </div>
  )
}

