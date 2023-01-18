import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AppBar from "../../navigation/AppBar/AppBar";
import {LogOut} from "react-feather";
import Content from "../../UIKit/containers/Content/Content";
import classes from "./SettingsPage.module.scss";
import Avatar from "../../UIKit/special/Avatar/Avatar";
import EditPasswordModal from "../../modals/EditPasswordModal";
import EditAvatarModal from "../../modals/EditAvatarModal";
import BackArrow from "../../UIKit/buttons/BackArrow/BackArrow";
import InputModal from "../../modals/InputModal";
import AuthService from "../../../../data/services/AuthService";
import {getAuth} from "firebase/auth";
import {useAppDispatch} from "../../../../core/hooks/app/useAppDispatch";

const SettingsPage: React.FC = (): JSX.Element => {
    const user = getAuth().currentUser;
    const [editAvatarModalIsActive, setEditAvatarModalIsActive] = useState(false);
    const [editNameModalIsActive, setEditNameModalIsActive] = useState(false);
    const [editEmailModalIsActive, setEditEmailModalIsActive] = useState(false);
    const [editPasswordModalIsActive, setEditPasswordModalIsActive] = useState(false);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        AuthService.logout(dispatch).then(() => navigate('/welcome')).catch(() => alert('Не удается выйти из аккаунта'));
    }


    return (
        <div>
            <div>
                <AppBar title={<h3>Настройки</h3>} leftIcon={(<BackArrow/>)}/>
                <Content>
                    <button className={classes.avatarContainer} onClick={() => setEditAvatarModalIsActive(true)}>
                        <div className={classes.avatarText}>
                            <p className={classes.title}>Аватар</p>
                            <p className={classes.hint}>Ваше изображение</p>
                        </div>
                        <Avatar/>
                    </button>
                    <button className={classes.container} onClick={() => setEditNameModalIsActive(true)}>
                        <p className={classes.title}>Имя</p>
                        <p className={classes.hint}>{user?.displayName ?? 'Не указано'}</p>
                    </button>
                    <button className={classes.container} onClick={() => setEditEmailModalIsActive(true)}>
                        <p className={classes.title}>Email</p>
                        <p className={classes.hint}>{user?.email}</p>
                    </button>
                    <button className={classes.container} onClick={() => setEditPasswordModalIsActive(true)}>
                        <p className={classes.title}>Пароль</p>
                    </button>

                    <button className={classes.logoutContainer} onClick={handleLogout}>
                        <LogOut/>
                        <p className={classes.title}>Выйти из аккаунта</p>
                    </button>
                </Content>
            </div>
            {editAvatarModalIsActive && <EditAvatarModal setOpenModal={setEditAvatarModalIsActive}/>}
            {editNameModalIsActive && <InputModal
                onSubmit={()=>{}}
                defaultValue={user?.displayName ?? ''}
                title={'Редактировать имя'}
                placeholder={'Ваше имя'}
                setOpenModal={setEditNameModalIsActive}/>}
            {editEmailModalIsActive && <InputModal
                onSubmit={()=>{}}
                defaultValue={user?.email ?? ''}
                title={'Редактировать email'}
                placeholder={'mail@mail.com'}
                setOpenModal={setEditEmailModalIsActive}/>}
            {editPasswordModalIsActive && <EditPasswordModal setOpenModal={setEditPasswordModalIsActive}/>}
        </div>
    );
};

export default SettingsPage;