import React from 'react';
import classes from './Badge.module.scss';


function Badge({onClick, text, badgeType = BadgeType.primary}: {
    onClick?: () => void;
    text: string;
    badgeType?: BadgeType;
}) {
    let className: string;
    let isClickable = !onClick;

    switch (badgeType) {
        case BadgeType.primary:
            className = classes.primaryBadge;
            break
        case BadgeType.surface:
            className = classes.surfaceBadge
    }

    switch (isClickable) {
        case true:
            return (
                <button className={className} onClick={onClick}>
                    {text}
                </button>)
        case false:
            return (
                <div className={className}>
                    {text}
                </div>)
    }
}

export const enum BadgeType {
    primary,
    surface
}

export default Badge;

