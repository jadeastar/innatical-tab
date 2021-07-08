import WidgetBase from "./WidgetBase"

const WeatherWidget = () => {
    return <WidgetBase>
        <h1 className="ml-12 mt-12 text-2xl">☀️ Sunny</h1>
        
        <br />
        <h1>☁️ Clouds</h1>
    </WidgetBase>
}

export default WeatherWidget