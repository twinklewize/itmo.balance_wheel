import React from 'react';
import EmptyStatePlaceholder from "../../../UIKit/special/EmptyStatePlaceholder/EmptyStatePlaceholder";

export default function TasksEmptyStatePlaceholder() {
    return (
        <EmptyStatePlaceholder
            src='images/illustrations/tech_life_communication.webp'
            alt='Man with infographic'
            title='У вас нет запланированных дел'
            hint='Добавьте новые дела в список, чтобы оставаться продуктивным'/>
    );
};

