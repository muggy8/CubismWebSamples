(function(window){
    if (!window.appHost){
        let callbackMemory = {}
        window.appHost = {
            on: function(eventName, callback){
                if (!callbackMemory[eventName]){
                    callbackMemory[eventName] = []
                }
                callbackMemory[eventName].push(callback)
                
                return function(){
                    callbackMemory[eventName].splice(
                        callbackMemory[eventName].indexOf(callback),
                        1
                    )
                }
            },
            emit: function(eventName, value){
                for(let callback of callbackMemory[eventName]){
                    callback(value)
                }
            }
        }
    }
})(window);