import React from 'react'

const ChartFilter = ({text, active, onClick}) => {
  return (
    <button 
        onClick={onClick} 
        className={`w-8 m-2 h-6 border-1 rounded-md flex items-center justify-center cursor-pointer 
            ${active
                ?"bg-orange-400 border-orange-700 text-gray-100"
                :"border-orange-300 text-orange-300"}
            transition duration-200 hover:bg-orange-600 hover:text-gray-100 hover:border-orange-700`
            }>
                {text}
        </button>
  )
}

export default ChartFilter