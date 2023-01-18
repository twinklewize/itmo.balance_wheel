import React from 'react';
import {useNavigate} from "react-router-dom";
import classes from './WelcomePage.module.scss';
import Button, {ButtonType} from "../../UIKit/buttons/Button/Button";

function WelcomePage() {
    let navigate = useNavigate();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.logoAndTitle}>
                    <img className={classes.logo} src={'/images/logo.svg'}></img>
                    <h1 className={classes.title}>Make your life balanced</h1>
                </div>
                <img className={classes.image}
                     src={'/images/illustrations/tech_life_remote_life.webp'}
                     alt='Woman with laptop'></img>
                <div className={classes.buttons}>
                    <Button
                        onClick={() => navigate('/login')}
                        buttonText='Войти'/>
                    <Button
                        onClick={() => navigate('/signup')}
                        type={ButtonType.outlined}
                        buttonText='Зарегистрироваться'/>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;