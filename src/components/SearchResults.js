import React from 'react'
import { useStockContext } from '../context/StockContext'
import { useThemeContext } from '../context/ThemeContext'

const SearchResults = ({results}) => {
  const {darkMode} = useThemeContext()
  const {setStockSymbol} = useStockContext( )
  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll
    ${darkMode
      ?"bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
      :"bg-white border-neutral-200 custom-scrollbar"
    }`}>
        {
        results.map(item=>
            <li 
            key={item.symbol} 
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${darkMode?"hover:bg-orange-600":"hover:bg-orange-200"}
            transition duration-300 
            `}
            onClick={()=>setStockSymbol(item.symbol)}
            >
                <span>{item.symbol}</span>
                <span>{item.description}</span>
            </li>)
        }
    </ul>
  )
}

export default SearchResults