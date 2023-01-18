import React from 'react';
import EmptyStatePlaceholder from "../../../UIKit/special/EmptyStatePlaceholder/EmptyStatePlaceholder";

export default function CalendarEmptyStatePlaceholder() {
    return (
        <EmptyStatePlaceholder
            src='images/illustrations/tech_life_moving.webp'
            alt='Box with images and videos'
            title='На этот день ничего не запланировано'
            hint='Свободный день, расслабьтесь и отдыхайте'/>
    );
};