import { useState } from "react";


const Item = ({ title, emoji, darkMode }) => {
    const [copy, setCopy] = useState(false);
    
    const handleCopy = () => {
        setCopy(true);
        navigator.clipboard.writeText(emoji);
        setTimeout(() => setCopy(false), 3000);
    }

    return (
        <article className={`card-emoji ${darkMode?"dark-mode":""}`}>
            <p 
                className="emoji-icon"
                onClick={handleCopy}    
            >{emoji}
            </p>
            <h4>{title}</h4>
            { copy && <p className="copied">Copied!</p> }
        </article>
    );
}
 
export default Item;