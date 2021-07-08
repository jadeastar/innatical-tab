import WidgetBase from "./WidgetBase"

const Friends = (props: {
    friends: any[],
}) => {
    return <WidgetBase>
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-auto">Your Friends</h1>
        <div className="flex flex-col gap-2">
          {props.friends.map(friend =>
            <div className="p-1 px-2 text-xl flex bg-primary rounded-md font-bold">{friend.name} 
                {friend.status == 0 ? (
                    <span className={`text-green-400 ml-auto font-normal`}>Online</span>
                ) : <></>}

                {friend.status == 1 ? (
                    <span className={`text-gray-400 ml-auto font-normal`}>Offline</span>
                ) : <></>}

                {friend.status == 2 ? (
                    <span className={`text-yellow-400 ml-auto font-normal`}>IDLE</span>
                ) : <></>}

                {friend.status == 3 ? (
                    <span className={`text-red-400 ml-auto font-normal`}>Do not Disturb</span>
                ) : <></>}
            
            
            </div>
          )}
        </div>
      </div>
    </WidgetBase>
}

export default Friends