const checkPermissions = (user, permissions) => {
    const granted = user.permissions.some(permission =>
        permissions.includes(permission),)

    if (!granted) {
        throw new Error(`You do not have sufficient permissions to do that!
            Required Permissions: ${permissions}
                Your Permissions: ${user.permissions}
        `)
    }

    return granted
}

module.exports = {checkPermissions}
