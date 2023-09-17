import {useEffect} from "react";

export function useKey(keyName , functionName) {

    useEffect(function () {
        function callback (e) {
            if(e.code.toLowerCase() === keyName.toLowerCase()){
                functionName();
            }
        }
        document.addEventListener("keydown" , callback);
        return function () {
            document.removeEventListener("keydown" , callback);
        }
    } , [functionName, keyName]);

}