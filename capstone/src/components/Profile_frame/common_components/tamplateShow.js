
import { createArr } from '../../../collection_func'
import useAudio from './useAudio'
import { OpenFile } from './OpenFile'
import { CardView } from './CardView'
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { get_files } from '../../../collection_func'

export const ElemShow = (props) => {
  const [fileInfo, setFileInfo] = React.useState(null);

  const types_content = useSelector(state => state.categories.categories.filter(item => item.type_content == 'null'))

  const collection = useSelector(state => {
    let key = props.mode == 'admin' ? 'checkItems' :'items';
    return state[key];
  }).items;

  let libraryArr = get_files(`../../../../../media/`, collection, props.type_content);

  let handlerOpen = (e) => {
   let findFileInfo = libraryArr.find(item => item.info.id == e.target.dataset.id);
   setFileInfo(findFileInfo);
   props.openViewer(); 
  }
  
  let content = props.cardSetOn && props.mode == 'user' 
    ?  <CardView handlerOpen={handlerOpen} {...props} /> 

    : props.cardSetOn && props.mode == 'admin' 

    ?  types_content.map((n, i) => { 

     return ( 

      <div key={i}>
            { libraryArr.filter(item => item.info.category_type == n.name).length > 0 &&  <h5>{n.name}</h5> }
            <CardView type_content={n.name} index={i} handlerOpen={handlerOpen} {...props} />
      </div>
    ) })

    : <OpenFile {...props} fileInfo={fileInfo} />   ;


  return (
    <div>
      { content }
    </div>
  )
}


