import WidgetBase from "./WidgetBase"

const StockWidget = (props: {
    symbols: string[],
}) => {
    return <WidgetBase>
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-auto">Your Portfolio</h1>
        <div className="flex flex-col gap-2">
          {props.symbols.map(symbol =>
            <div className="p-1 px-2 text-3xl flex bg-primary rounded-md font-bold">{symbol} <span className="text-green-400 ml-auto font-normal">▲ 1%</span></div>
          )}
        </div>
      </div>
    </WidgetBase>
}

export default StockWidget