import { FETCH_ITEMS, ADD_ITEM } from "../constants/items";

export default (items = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;
    case ADD_ITEM:
      return [ ...items, action.payload ];
    default:
      return items;
  }
}

