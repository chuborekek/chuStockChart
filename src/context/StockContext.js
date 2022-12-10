import React, { createContext, useContext, useState } from 'react'

const ChuStockContext = createContext()

const StockContext = ({children}) => {
    const [stockSymbol,setStockSymbol]=useState('GME');
  return (
    <ChuStockContext.Provider value={{stockSymbol,setStockSymbol}}>
        {children}
    </ChuStockContext.Provider>
  )
}

export default StockContext

export const useStockContext=()=>{ return useContext(ChuStockContext)}
