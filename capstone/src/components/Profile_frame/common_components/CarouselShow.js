import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import { OpenFile } from './OpenFile'
import { CardElement } from './CardElement'
import {useDispatch, useSelector} from 'react-redux';
import { get_files } from '../../../collection_func'


 export const CarouselShow = ( props ) => {

   const collection = useSelector(state => {
      let key = props.mode == 'admin' ? 'checkItems' : 'items';
      return state[key];
   }).items;

   let libraryArr = get_files(`../../../../../media/`, collection, props.type_content);

   let list = libraryArr.map((item, index) => { 
       return( 
       <Carousel.Item interval={null} key={index}>

          <OpenFile carousel={true} fileInfo={item} {...props} />

       </Carousel.Item>
     ) })

   return (
        <Carousel interval={null}>
          { list }
        </Carousel>
   )

 }


