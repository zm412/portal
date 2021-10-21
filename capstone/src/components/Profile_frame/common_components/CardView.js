
import React, { Component } from 'react';
import useAudio from './useAudio'
import { Button, Carousel, Card } from 'react-bootstrap';
import { CardElement } from './CardElement'
import { ButtonSet } from './ButtonSet'
import {useDispatch, useSelector} from 'react-redux';
import {setIsShared} from '../../../reducers/checkItemReducer'
import { get_files } from '../../../collection_func'

export const CardView = (props) => {

  const {userid, is_super, username} = useSelector(state => state.userInfo);

  const collection = useSelector(state => {
    let key = props.mode == 'admin' ? 'checkItems' : 'items';
    return state[key];
  }).items;

  let libraryArr = get_files(`../../../../../media/`, collection, props.type_content);
 
  let [players, toggle] = useAudio(libraryArr);

  let collectionFiles = props.type_content == 'music' ? players : libraryArr ;

    let list = collectionFiles.map((item, index) => { 

      return (
        <div key={index}>
          <ButtonSet {...props} fileInfo={item} index={index} />
        </div>
      )

      })

  return (
    <div>{ list }</div>
  )
   }


