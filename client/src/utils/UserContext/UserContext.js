import { createContext } from 'react';

const UserContext = createContext({
    user: {},
    first: '',
    last: '',
    username: '',
    password: '',
    email: '',
    editUser: '',
    editFirst: '',
    editLast: '',
    editEmail: '',
    isLoggedIn: false,
    handleInputChange: () => { },
    handleProfileEditChange: () => { },
    handleEditProfileSubmit: () => { },
    handleRegisterUser: () => { },
    handleSignInUser: () => { },
    handleLogOut: () => { },
    handleUserProfile: () => { },
    handleToggleEditFalse: () => { }
});

export default UserContext;