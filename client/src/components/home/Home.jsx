import styles from './Home.module.css';

import CardSection from './card-section/CardSection';
import { useGetPartialTokens } from '../../hooks/useGetAllTokens';

const Home = () => {
    const tokens = useGetPartialTokens();
    return (
        <>
            <div className={styles.homeIntroContainer}>
                <h1 className={styles.homeIntroTitle}>WELCOME TO THE CRYPTO BLOG</h1>
                <p className={styles.homeIntroText}>
                    Welcome to the Crypto Blog, your premier destination for insightful articles and discussions about the ever-evolving world of cryptocurrency. Whether you're a seasoned investor, a blockchain enthusiast, or just starting to explore the potential of digital currencies, our blog offers a wealth of knowledge tailored to your interests.
                </p>
                <p className={styles.homeIntroText}>
                    Our platform fosters an interactive community where readers can engage with content through commenting, allowing for vibrant discussions and diverse perspectives. You can also express your opinions on comments by liking or disliking them, contributing to the dynamic exchange of ideas. The Crypto Blog is dedicated to providing a space for both learning and conversation, ensuring that you stay informed and connected with the cryptocurrency community. Dive in, share your thoughts, and become a part of our growing network of crypto aficionados.
                </p>
            </div>
            <div className={styles.homewrapper}>
                <CardSection tokens={tokens} name={'Tokens'} />
            </div>
        </>
    );
};

export default Home;
