import React from 'react';
import EmptyStatePlaceholder from "../../../UIKit/special/EmptyStatePlaceholder/EmptyStatePlaceholder";

export default function HabitsEmptyStatePlaceholder() {
    return (
        <EmptyStatePlaceholder
            src='images/illustrations/tech_life_life_management.webp'
            alt='Woman with notes'
            title='Развивайте новые привычки'
            hint='Добавьте небольшую привычку, чтобы сделать жизнь организованнее'/>
    );
};

