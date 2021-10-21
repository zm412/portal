
import React, { Component } from 'react';
import {CarouselShow } from '../common_components/CarouselShow';
import {ElemShow} from '../common_components/tamplateShow';
import {ListItems} from '../common_components/ListItems';
import { Buttom, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setIsListChanged} from '../../../reducers/itemReducer'
import {setIsShared} from '../../../reducers/checkItemReducer'
import { fetchDataPost } from '../../../collection_func'


export const FilesList = () => {


  const types_content = useSelector(state => state.categories.categories.filter(item => item.type_content == 'null'));
  const dispatch = useDispatch();
  const collection = useSelector(state => state.items).items;

 

  let list = types_content.map((n, i) => { 
    return(<div key={i}> <ListItems index={i} type_content={n.name} mode={'user'} /></div> ) 
  });
            

  return ( <div> { list } </div>) 
};


