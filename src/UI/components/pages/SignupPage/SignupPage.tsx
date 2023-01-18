import React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar, {AppBarType} from "../../navigation/AppBar/AppBar";
import Content from "../../UIKit/containers/Content/Content";
import {Form} from "../../UIKit/inputs/Form/Form";
import {ArrowLeft} from "react-feather";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import AuthService from "../../../../data/services/AuthService";
import {useAppDispatch} from "../../../../core/hooks/app/useAppDispatch";

function SignupPage() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSignup = (email: string, password: string) => {
        AuthService.createUser(email, password, dispatch)
            .then(() => navigate('/sphere/select'))
            .catch(() => alert('Попробуйте ввести другие данные'))
    }

    return (
        <>
            <AppBar
                type={AppBarType.transparent}
                title={<h3>Регистрация</h3>}
                leftIcon={(<IconButton onClick={() => navigate('/welcome')}><ArrowLeft/></IconButton>)}/>
            <Content>
                <Form handleClick={handleSignup} buttonText={'Зарегистрироваться'}/>
            </Content>
        </>
    );
}

export default SignupPage;