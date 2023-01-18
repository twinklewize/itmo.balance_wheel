import React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar, {AppBarType} from "../../navigation/AppBar/AppBar";
import Content from "../../UIKit/containers/Content/Content";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import {ArrowLeft} from "react-feather";
import {Form} from "../../UIKit/inputs/Form/Form";
import {useAppDispatch} from "../../../../core/hooks/app/useAppDispatch";
import AuthService from "../../../../data/services/AuthService";


const LoginPage: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const handleLogin = (email: string, password: string) => {
        AuthService.login(email, password, dispatch)
            .then(() => {navigate('/tasks');})
            .catch(() => alert('Неверный логин или пароль!'))
    }

    return (
        <>
            <AppBar
                type={AppBarType.transparent}
                title={<h3>Вход</h3>}
                leftIcon={(<IconButton onClick={() => navigate('/')}><ArrowLeft/></IconButton>)}/>
            <Content>
                <Form handleClick={handleLogin} buttonText={'Войти'}/>
            </Content>
        </>
    );
};

export default LoginPage;