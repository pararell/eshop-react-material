import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
    loading: false,
    user: null,
    lang: 'en',
    currency: '€',
    products: {
        all: [],
        page: 1,
        pages: 1,
        limit: 10,
        total: 0
    },
    sortOptions: [{
            name: 'Newest',
            id: 'newest',
            active: true
          },
          {
            name: 'Oldest',
            id: 'oldest',
            active: false
          },
          {
            name: 'Price-asc',
            id: 'priceasc',
            active: false
          },
          {
            name: 'Price-decs',
            id: 'pricedesc',
            active: false
    }],
    categories: {
        all: [],
        pagination: {}
    },
    product : null,
    cart: null,
    userOrders: null,
    order: null,
    priceFilter: Infinity,
    dashboard: {
        orders: null,
        order: null,
        productImages: [],
        translations: []
    }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
        return {
            ...state,
            [action.payload.type]: action.payload.value
        }
    case 'STORE_USER_ACTION':
      return {
        ...state,
        user: action.payload,
      };
    case 'CHANGE_LANG':
      return {
        ...state,
        lang: action.payload,
      };
    case 'SAVE_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: {
        ...state.products,
        ...action.payload,
        }
      };
    case 'SAVE_PRODUCT':
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
