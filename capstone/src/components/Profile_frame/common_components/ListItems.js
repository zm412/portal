
import React, { Component } from 'react';
import {CarouselShow } from './CarouselShow';
import {ElemShow} from './tamplateShow';
import { Buttom, Card } from 'react-bootstrap';
import OpenFile from './OpenFile'
import { Modal_bt } from './Modal'
import {useDispatch, useSelector} from 'react-redux';
import { get_files } from '../../../collection_func'


export const ListItems = (props) => { 
  const [cardSetOn, setCardSetOn] = React.useState(true);
  const collection = useSelector(state => {
    let key = props.mode == 'admin' ? 'checkItems' : 'items';
    return state[key];
  }).items;

  let libraryArr = get_files(`../../../../../media/`, collection, props.type_content);
  let closeViewer = (e) => setCardSetOn(true);
  let openViewer = (e) => setCardSetOn(false); 
  let title = props.type_content ?  'My '+props.type_content : 'Files';
  let buttonsName = props.type_content ?  'My '+props.type_content + ' ' + libraryArr.filter(n => n.info.category_type == props.type_content).length : 'Files ' + libraryArr.length;

  let carouselMode = <CarouselShow {...props} />
  let cards =  <ElemShow cardSetOn={cardSetOn} openViewer={openViewer} { ...props } />


  return (
    <div key={props.index}>
        <Modal_bt title={title} name={buttonsName} content1={cards} content2={carouselMode} closeViewer={closeViewer} cardSetOn={cardSetOn} />
   </div>
  )
}

