import React, { useState } from 'react';
import classes from './IconPopup.module.scss';
import buttonsImage from '../static/image/buttonIcons';

const IconPopup = (props) => {
    const {
        size = 18,
        className = '',
        image = '',
        children,
        tooltipStyles,
        ...otherProps
    } = props;

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const imgSizeStyle = { width: `${size}px`, height: `${size}px` };

    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
    };

    const handleMouseEnter = () => {
        toggleTooltip();
    };

    const handleMouseLeave = () => {
        toggleTooltip();
    };

    const imagePath = image in buttonsImage ? buttonsImage[image] : image;

    return (
        <div
            className={`${classes.iconContainer} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...otherProps}
        >
            <img src={imagePath} alt="Icon" style={{...imgSizeStyle, ...otherProps}} className={classes.icon}/>
            {isTooltipVisible && (
                <div className={classes.tooltip} style={tooltipStyles}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default IconPopup;
