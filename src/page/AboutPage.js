import classes from './AboutPage.module.scss'
import avatarMykyta from '../static/image/main/AvatarMykyta.png'
import avatarMaxim from '../static/image/main/AvatarMaxim.png'
import avatarUliana from '../static/image/main/AvatarUliana.png'
import avatarKate from '../static/image/main/AvatarKate.jpg'

const AboutPage = () => {
    return <div className={classes.content}>
        <h1>About us</h1>
        <div className={classes.description}>
            <p>Nulla minim sint id eiusmod duis. Deserunt proident sunt consequat mollit tempor ad et. Velit esse nulla adipisicing sint est consequat elit minim commodo pariatur.Ut cillum amet culpa reprehenderit laboris. Laboris amet occaecat dolore exercitation. Ad ad mollit elit nisi est enim sint laboris occaecat reprehenderit. Dolor officia laboris irure laboris. Ex veniam ullamco laborum amet sunt laborum sint occaecat excepteur ex in.</p>
            <span className={classes.lastTitle}>- Forum Project</span>
        </div>
        <div className={classes.userInfoBox}>
            <div className={classes.userInfo}>
                <div className={classes.avatarInfo}>
                    <img className={classes.avatarImg} src={avatarMykyta} alt='Mykyta'></img>
                    <p>Mykyta Havrylenko</p>
                </div>
                <p>Enim ex enim consequat in commodo reprehenderit dolore sint.</p>
                <div className={classes.roleBox}>
                    <h3>Role:</h3>
                    <h4>Front-end</h4>
                    <h4>Back-end</h4>
                </div>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.avatarInfo}>
                    <img className={classes.avatarImg} src={avatarMaxim} alt='Maxim'></img>
                    <p>Maxim Belikov</p>
                </div>
                <p>Exercitation duis ullamco ex adipisicing ea.</p>
                <div className={classes.roleBox}>
                    <h3>Role:</h3>
                    <h4>Front-end</h4>
                    <h4>Back-end</h4>
                </div>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.avatarInfo}>
                    <img className={classes.avatarImg} src={avatarUliana} alt='Uliana'></img>
                    <p>Uliana Andreieva</p>
                </div>
                <p>Duis non pariatur irure cillum commodo mollit dolore qui enim nostrud fugiat sint.</p>
                <div className={classes.roleBox}>
                    <h3>Role:</h3>
                    <h4>Back-end</h4>
                </div>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.avatarInfo}>
                    <img className={classes.avatarImg} src={avatarKate} alt='Kate'></img>
                    <p>Katerina Bolotyuk</p>
                </div>
                <p>Amet ipsum officia irure enim consectetur sit qui Lorem do ipsum id.</p>
                <div className={classes.roleBox}>
                    <h3>Role:</h3>
                    <h4>Back-end</h4>
                </div>
            </div>
        </div>
    </div>
}

export default AboutPage;
