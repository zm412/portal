import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';
import checkItemReducer from './checkItemReducer';
import allItemsReducer from './allItemsReducer';
import userInfoReducer from './userInfoReducer';
import commentsReducer from './commentsReducer';


const rootReducer = combineReducers({
  categories: categoryReducer,
  items: itemReducer,
  checkItems: checkItemReducer,
  allItems: allItemsReducer,
  userInfo: userInfoReducer,
  commentsInfo: commentsReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunk));


