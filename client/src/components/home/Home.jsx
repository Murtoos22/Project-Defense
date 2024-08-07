import styles from './Home.module.css';

import CardSection from './card-section/CardSection';
import { useGetPartialTokens } from '../../hooks/useGetAllTokens';

const Home = () => {
    const tokens = useGetPartialTokens();
    // TODO change LOREM text
    return (
        <>
            <div className={styles.homeIntroContainer}>
                <h1 className={styles.homeIntroTitle}>WELCOME TO THE CRYPTO BLOG</h1>
                <p className={styles.homeIntroText}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam maxime hic tempore placeat, ipsa sapiente consectetur minima delectus nulla tempora iste omnis architecto, velit enim. Accusantium hic odio reprehenderit, sit id magnam molestias deserunt vel aliquam debitis ex. Assumenda obcaecati ipsam, accusantium in cupiditate est commodi nisi. Aut, soluta? Cum, unde explicabo doloribus iusto blanditiis est distinctio incidunt sequi aliquam! Repudiandae, beatae. Adipisci iste deserunt quidem! Nulla tempore aperiam, quos doloremque nesciunt totam exercitationem recusandae eum repudiandae debitis veritatis sint fugit amet eveniet odio aliquam soluta, eaque temporibus, obcaecati expedita? Sapiente quidem eveniet commodi excepturi amet maxime eum ducimus nam?
                </p>
            </div>
            <div className={styles.homewrapper}>
                <CardSection tokens={tokens} name={'Tokens'} />
                <CardSection tokens={tokens} name={'Tokens'} />
                <CardSection tokens={tokens} name={'Tokens'} />
            </div>
        </>
    );
};

export default Home;
