import styles from './Card.module.css';

const Card = (props) => {
    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.name}>{props.token.name}</h2>
            <p className={styles.paragraph} readOnly>
                {props.token.description}
            </p>

            <button>Learn more</button>
        </div>
    );
};

export default Card;