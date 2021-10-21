
const SET_ALL_ITEMS_LIST = "SET_ALL_ITEMS_LIST"
const SET_IS_PAGE_CHANGED = "SET_IS_PAGE_CHANGED"
const SET_LIMIT_NUM = 'SET_LIMIT_NUM'
const SET_COUNTER = 'SET_COUNTER'
const SET_QUANTITY = 'SET_QUANTITY'
const SET_START = 'SET_START'
const SET_END = 'SET_END'
const SET_FILTER_ARR = 'SET_FILTER_ARR'

const defaultState = {
  items: [],
  isPageChanged: false,
  counter : 1,
  limit_num : 3,
  quantity: '' ,
  start: 0,
  end: 3,
  filterArr: []
}

export default function categoryReducer(state = defaultState, action){
  switch (action.type) {

    case SET_FILTER_ARR:
      return {
        ...state,
        filterArr: action.payload
      }


    case SET_ALL_ITEMS_LIST:
      return {
        ...state,
        items: action.payload
      }

    case SET_COUNTER:
      return {
        ...state,
        counter : action.payload
      }


    case SET_QUANTITY:
      return {
        ...state,
        quantity: action.payload
      }


    case SET_IS_PAGE_CHANGED:
      return {
        ...state,
        isPageChanged: action.payload
      }

    case SET_LIMIT_NUM:
      return {
        ...state,
        limit_num: action.payload
      }

    case SET_START:
      return {
        ...state,
        start: action.payload
      }

    case SET_END:
      return {
        ...state,
        end: action.payload
      }

    default:
      return state
  }

}

export const setAllItemsList = (allItemsList) => ({type: SET_ALL_ITEMS_LIST, payload: allItemsList})
export const setIsPageChanged = (allItemsChangedBool) => ({type: SET_IS_PAGE_CHANGED, payload: allItemsChangedBool})
export const setLimitNum = (num) => ({type: SET_LIMIT_NUM, payload: num})
export const setCounter = (num) => ({type: SET_COUNTER, payload: num})
export const setQuantity = (num) => ({type: SET_QUANTITY, payload: num})
export const setStart = (num) => ({type: SET_START, payload: num})
export const setEnd = (num) => ({type: SET_END, payload: num})
export const setFilterArr = (arr) => ({type: SET_FILTER_ARR, payload: arr})
