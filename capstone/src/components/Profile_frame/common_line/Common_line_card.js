
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import { createArr } from '../../../collection_func'
import { OpenCommonFile } from './OpenCommonFile';
import {setIsPageChanged, setStart, setEnd, setAllItemsList, setLimitNum, setCounter, setQuantity} from '../../../reducers/allItemsReducer'
import {useDispatch, useSelector} from 'react-redux';
import {Form_comment} from './Form_comment'
import { get_files, fetchDataPost } from '../../../collection_func'

export const Common_line_card = (props) => { 
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const [dataArr, setDataArr] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [isCommentsBlockOpened, setIsCommentsBlockOpened] = React.useState(false);
  const [openedItemId, setOpenedItemId] = React.useState(null);
  const dispatch = useDispatch();


  const closeCommentsBlock = () => setIsCommentsBlockOpened(false)
  
  const showComments = async (e) => { 
    if(isCommentsBlockOpened){
      setIsCommentsBlockOpened(false)
    }else{
      setComments(props.fileInfoObj.info.comment_info) 
      setIsCommentsBlockOpened(true)
      setOpenedItemId(e.target.dataset.id)
    }
  }


  const addComment = async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
      }else{
        await fetch('add_comment/' + e.target.dataset.id, {
                    method: 'POST',
                    headers: { 'X-CSRFToken': csrftoken },
                    body: new FormData(form) 
                      })
        .then(response => response.json())
        .then(result => {
          setComments(result.comments);
          form.reset()
        })
        .catch(err => console.log(err, 'error'))

      }
  }
 
  const saveOnList = (e) => {
    fetchDataPost(`save_on_my_list/`, { id: e.target.dataset.id})
      .then(result => { 
        setComments(result.comments) 
        dispatch(setIsPageChanged(true))
      })
 
  }
  
  const addLike = (e) => {
    fetch('add_like/'+e.target.dataset.id)
      .then(response => response.json())
      .then(result => {
        dispatch(setIsPageChanged(true))
      })
      .catch(err => console.log(err, 'error'))
  }
    
    if(props.fileInfoObj.category_type == 'book'){
      fetch(props.fileInfoObj.url)
        .then(response => response.text())
        .then(text => { 
          createArr(text, pageLimit, findFileInfo.url.endsWith('fb2'))
            .then(doc => { 
              setDataArr(doc) 
            })
        })
    }
  let arr = props.fileInfoObj.info.category_list;

  let str_categories = arr.reduce((str, n, i) =>  {
      str += i < arr.length-1 ? n.name + ', ': n.name;
      return str;
  }, '')

  return( 
  <Card>
    <Card.Body>
      <Card.Text>User: { props.fileInfoObj.info.user_username }</Card.Text>
      <Card.Text>Type content: { props.fileInfoObj.info.category_type } ({ str_categories })</Card.Text>
        <OpenCommonFile 
                fileInfo={props.fileInfoObj} 
                dataArr={dataArr} 
                mode={ 'common_user' }
                saveOnList={saveOnList} 
                addComment={addComment} 
                addLike={addLike}
                showComments={showComments}
                comments={comments}
                isCommentsBlockOpened={isCommentsBlockOpened}
                closeCommentsBlock={closeCommentsBlock}
                openedItemId={openedItemId}
                />
    </Card.Body>
  </Card>
) }
