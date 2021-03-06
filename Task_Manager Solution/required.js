function loginHandler(userName, passwordOrKey, secondIsAKey) {
    if (application.name === 'Task_Manager') {
        var user = ds.User.find('login = :1 or email = :1', userName);

        if (user !== null) {
            if (user.passwordIsValid(passwordOrKey, secondIsAKey)) {
                return {
                    name: userName,
                    fullName: user.fullname,
                    belongsTo: user.group?user.group.split(','): [],
                    storage: {
                        ID: user.getKey()
                    }
                };
            } else {
                return {
                    error: 121,
                    errorMessage: 'Password is Invalid'
                };
            }
        }
    }

    return false;
}
