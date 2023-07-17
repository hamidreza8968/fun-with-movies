import {useState} from "react";
import PropType from "prop-types";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};


StarRating.prototype = {
    maxRating: PropType.number,
    defaultRating: PropType.number,
    color: PropType.string,
    size: PropType.number,
    massage: PropType.array,
    className:PropType.string,
    onSetRating:PropType.func,

};

export default function StarRating({
                                       maxRating = 5,
                                       color = "#fcc419",
                                       size = 48,
                                       className = "",
                                       message = [],
                                       defaultRating = 0,
                                       onSetRating,
                                   }) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.5}px`,
    };

    // function handleRating(rating) {
    //     setRating(rating);
    //     onSetRating(rating);
    // }


    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}, (_, i) => <Star
                    key={i}
                    onRate={() => {
                        setRating(i + 1);
                        // onSetRating(rating);
                    }}
                    full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    onHoverIn={() => setTempRating(i + 1)}
                    onHoverout={() => setTempRating(0)}
                    color={color}
                    size={size}
                />)
                }
            </div>
            <p style={textStyle}>{message.length === maxRating ? message[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}</p>
        </div>
    );
}


function Star({onRate, full, onHoverIn, onHoverout, color, size}) {

    const starStyle = {
        height: `${size}px`,
        width: `${size}px`,
        display: "block",
        cursor: "pointer",
        color: {color}
    };

    return (
        <span role="button" style={starStyle} onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverout}>
            {full ? (<svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" stroke-width="1.5"
                          stroke={color} className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" stroke-width="1.5"
                            stroke={color} className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                </svg>
            )}
        </span>
    )
}