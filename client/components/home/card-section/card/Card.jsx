import styles from './Card.module.css';

import { ReactComponent as TokenIcon } from '../../../../public/token-images/bitcoin.svg';

const Card = () => {
    return (
        <div className={styles.cardContainer}>
            <TokenIcon width="50" height="50" viewBox="0 0 650 650" />
            <p className={styles.paragraph} readOnly>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero consectetur porro dolorum repellat ipsa? Ullam magni animi accusamus delectus nihil sit, consequuntur aspernatur, perferendis fugiat doloremque cupiditate omnis quae maxime.
            </p>

            <button>Learn more</button>
        </div>
    );
};

export default Card;