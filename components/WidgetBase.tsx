import React from "react"

const WidgetBase: React.FC<{}> = ({ children }) => {
  return (
    <div className="shadow bg-offwhite dark:bg-secondary dark:text-white rounded-lg p-5" style={{width: 300, height: 300}}>
      {children}
    </div>
  )
}

export default WidgetBase