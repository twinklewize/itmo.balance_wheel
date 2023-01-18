import React, {FC, useState} from 'react';
import classes from './Form.module.scss';
import Input from "../Input/Input";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../../buttons/Button/Button";

interface FormProps {
    buttonText: string;
    handleClick: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({buttonText, handleClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className={classes.formElementContainer}>
                <span>Email:</span>
                <Input type={"email"}
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       height={48}
                       placeholder={'mail@gmail.com'}/>
            </div>
            <div className={classes.formElementContainer}>
                <span>Пароль:</span>
                <PasswordInput onChange={(e) => setPassword(e.target.value)}
                               value={password}
                               height={48}/>
            </div>
            <Button buttonText={buttonText}
                    onClick={() => handleClick(email, password)}/>
        </>
    )
}

export {Form}