import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import classes from './SwitchPager.module.scss';

const SwitchPager = ({ currentPage, totalPages }) => {
    const params = new URLSearchParams(window.location.search);

    const createUrlWithNewPage = (newPage) => {
        const newParams = new URLSearchParams(params);
        newParams.set('currentPage', newPage);

        return `${window.location.pathname}?${newParams.toString()}`;
    };

    const switchUrlPlus = createUrlWithNewPage(currentPage + 1);
    const switchUrlMinus = createUrlWithNewPage(currentPage - 1);

    const isNextDisabled = currentPage >= totalPages;
    const isPrevDisabled = currentPage <= 1;

    return (
        <div className={classes.switcherBox}>
            <Link to={isPrevDisabled ? '#' : switchUrlMinus}>
                <Button
                    className={`${classes.button} ${classes.left}`}
                    beforeImg="arrow"
                    disabled={isPrevDisabled}
                />
            </Link>
            {currentPage} / {totalPages}
            <Link to={isNextDisabled ? '#' : switchUrlPlus}>
                <Button
                    className={classes.button}
                    beforeImg="arrow"
                    disabled={isNextDisabled}
                />
            </Link>
        </div>
    );
};

export default SwitchPager;
