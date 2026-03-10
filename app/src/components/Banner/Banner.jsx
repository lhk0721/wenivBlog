import Styles from './Banner.module.css'

export default function Banner(){
    return(<div className={Styles.banner}>
        <div className={Styles.bannerContent}>
            <div className={Styles.textBox}>
                <p className={Styles.divider}>
                React & Node
                </p>
                <h1>My BLOG</h1>
                <p className={Styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!</p>
            </div>
        </div>
    </div>)
}