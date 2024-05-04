import { searchEmoji } from "../helpers/searchEmoji";
import Item from "./Item";

const Result = ({ valueEmoji, darkMode }) => {
    const arrayEmojis = searchEmoji(valueEmoji);
    //console.log(arrayEmojis);

    return (
        <section className="container results">
            {
                arrayEmojis && arrayEmojis.map(item => (
                    <Item
                        key={item.title}
                        title={item.title}
                        emoji={item.symbol}
                        darkMode={darkMode}
                    />
                ))
            }
            
        </section>
    );
}
 
export default Result;