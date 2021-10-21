
 const createArr = async (text, pageLimit, isFB2) => {
  let preparedText = await text;
  if(isFB2){
    preparedText = await changeFB2(text);
  }

  let arrText = await preparedText.split(/[\n\t\r]/);
      let resultArr = [];
      for(let j = 0; j < arrText.length; j += pageLimit){
        let tempArr = [];
        for(let i = j; i < j+pageLimit; i++){
          tempArr.push(arrText[i]) 
        }
          resultArr.push(tempArr);
      }

  return resultArr;
}

let changeFB2 = (text) => {
  let re1 = /(\<binary.[^\<\>]*\>.[^\<\>]*\<\/binary\>)|\<.[^\<\>]*\>|\<\/(.[^\<\>]*)\>|\<.[^\<\>]*\/\>/g;
  let newstr1 = text.replace(re1, '\n');
  let re2 =  /[\r\n]+/g;
  let newstr2 = newstr1.replace(re2, '\n');
  let re3 = /&quot;|&lsquo;|&rsquo;|&ldquo;|&rdquo;|&sbquo;|&bdquo;/g;
  let newstr3 = newstr2.replace(re3, '"');
  
  return newstr3;
}


const get_files = (url, arr, type_c) => {
  return  arr.reduce(( newArr, n ) => { 
        if(n.category_type == type_c || type_c == undefined){
          newArr.push({ url: url+n.file_item, info: n } );
        } 
        return newArr;
      }, [])
}


async function fetchDataPost(url, obj){  
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  try{
    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'X-CSRFToken': csrftoken,
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj) 
    });
    return await response.json();
  } catch(e){
    console.error(e);
  }
}


export { createArr, fetchDataPost, get_files };
