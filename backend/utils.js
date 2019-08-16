const checkPermissions = (user, permissions) => {
    const granted = user.permissions.some(permission =>
        permissions.includes(permission),)

    return granted
}

module.exports = {checkPermissions}
