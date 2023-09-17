import {useState} from "react";

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            {isOpen && children}
        </div>
    );
}
export default Box