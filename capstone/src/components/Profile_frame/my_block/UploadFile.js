
import React, { Component } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsListChanged} from '../../../reducers/itemReducer'

const ListTypeContent = ({arr, type_content}) => { 
  let title = type_content.toLowerCase();

  return (
    <option value={title}>{type_content} </option>
  )
}



export const UploadFile = () => {

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories).categories;
  const [ typeC, setTypeC ] = React.useState('Choose here');
  const [ nameC, setNameC ] = React.useState(typeC);
  const [ titleFile, setTitleFile ] = React.useState('');
  const [ descFile, setDescFile ] = React.useState('');
  const [ fileData, setFileData ] = React.useState(null);
  const [ fileFormat, setFileFormat ] = React.useState(null);
  const { userid, username, is_super, files_size } = useSelector(state => state.userInfo);

  let handleChange = (e) => {
    setTypeC(e.target.value);
    let ext = categories.find(n=> n.name == e.target.value);
    setFileFormat(ext.valid_extensions);
    document.querySelector(e.target.dataset.connect).classList.remove('none_display'); }


  const handlerButton = (e) => {
    document.querySelector(e.target.dataset.connect).classList.toggle('none_display');
  }

  let chooseName = (e) => {
    const value = Array.from(event.target.options).filter(el => el.selected).map(el => el.value);
    setNameC(value);
     document.querySelector(e.target.dataset.connect).classList.remove('none_display');

  }

  let closeUpload = () => {
    ['#id_type_category', '#id_name_category', '#id_form'].map(n => document.querySelector(n).classList.add('none_display'));
    setTypeC('Choose here');
    setNameC(typeC);
  }

  let checkFileFormat = (file, format) => {
    let ext = format.split(',');
    return ext.some(n => file.name.endsWith(n.trim()))
  }

  let sendFile = async (e) => {
    e.preventDefault();

    if(checkFileFormat(fileData, fileFormat)){
        if (fileData.size > 10485760){
                alert("File size must under 10MiB!");
                return
            }else if(( files_size+fileData.size )/1024/1024 > 100){
                alert("Sorry, your box is full");
            }else{

              let form_data = new FormData(e.target);
              form_data.append('type_content', typeC);
              nameC.map(n => form_data.append('category', n))
          
              try{
                let response = await fetch(`put_in/`, {
                    method: 'POST',
                    headers: { 'X-CSRFToken': csrftoken },
                    body: form_data
                });
                let data = await response.json();
                dispatch(setIsListChanged(true))
                closeUpload();
                setTitleFile('');
                setDescFile('');
                e.target.reset();
              } catch(e){
                  console.error(e);
              }
        }
    }else{
      alert('Wrong format')
    }
            
  }

  const getExt = (typeC, categoriesArr) => {
    if(categoriesArr){
      let ext = categoriesArr.find(n=> n.type_content == typeC).valid_extensions;
      return ext
    }
    return ''
  }

  const onFileChange = e => setFileData(e.target.files[0])

   let types_content = categories ? categories.filter(item => item.type_content == 'null').reduce(( newArr, item  ) =>{  
                                  newArr.push(item.name) ;
                                  return newArr;
                          }, []) : []

  let list = types_content.map((n, i) => ( <ListTypeContent key={i} arr={ categories } type_content={n} /> ));
  let list2 = categories.filter(item => item.type_content == typeC).map((item, i) => <option key={i} value={item.name}>{item.name}</option>)
            


  return (
    <div className='row mt-5'>
    <button data-connect='#id_type_category' className="btn btn-success mt-2 center_cl col-sm-7" onClick={handlerButton} variant="primary">Add files</button>

    <div id="id_type_category" className='none_display'>
      <h6>Choose type content</h6>
      <select className='form-select' data-connect='#id_name_category' onChange={handleChange} value={typeC} >
        <option disabled>Choose here</option>
        { list }
      </select>

    <div id="id_name_category" className='none_display'>
      <h6>Choose name category</h6>
      <select className='form-select' id='file_up' data-connect='#id_form' multiple={true} onChange={chooseName} >
        <option disabled>Choose here</option>
        { list2 }
      </select>
    </div>

    <div id="id_form" className='none_display'>
      <h6>Upload file</h6>
        <form encType="multipart/form-data" method="post" onSubmit={(e)=>sendFile(e)}> 
          <input type="text" className="form-control" required placeholder='Title' onChange={(e)=> setTitleFile(e.target.value)} name='title' value={titleFile} />
          <input type="text" className="form-control" required placeholder='Description' onChange={(e)=> setDescFile(e.target.value)} name='description' value={descFile} />
          <input type="file"
              className="form-control"  
              id="fileUpload" 
              onChange={onFileChange} 
              required 
              placeholder='Upload' 
              name='file_item' 
          />
          <input type="submit" className="btn btn-primary mt-2 "  value='Send' />
        </form>
          <input type="submit" className="btn btn-primary mt-2" onClick={closeUpload} value='Cancel' />
    </div>
    </div>

    </div>

  )
};


