
import React, { Component } from 'react';
import { Manage_categories } from './admin_block/Manage_categories';
import { Add_category } from './admin_block/Add_category';
import { ListItems } from './common_components/ListItems';
import {useDispatch, useSelector} from 'react-redux';


export  const Admin_panel = () => {
  const categories = useSelector(state => state.categories).categories;
  const checkItems = useSelector(state => state.checkItems);


 
  return (
    <div className="m-3" >
      <div> { categories != null && <Add_category /> }</div>
      <div> { categories != null && <Manage_categories  /> }</div>
      <div> { checkItems != null && categories != null && <ListItems mode={'admin'} /> }
        </div>
    </div>
  )
};


