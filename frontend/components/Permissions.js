import React from "react"
import {useState} from "react"
import PropTypes from "prop-types"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import Error from "./Error"
import {Table, SickButton} from "../styles"

const PERMISSIONS = [
    "ADMIN",
    "USER",
    "ITEM_CREATE",
    "ITEM_UPDATE",
    "ITEM_DELETE",
    "PERMISSION_UPDATE",
]

const READ_USERS = gql`
    query READ_USERS {
        users {
            id
            name
            email
            permissions
        }
    }
`

const Permissions = () => {
    const {loading, error, data} = useQuery(READ_USERS)

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error}/>
    }

    const {users} = data

    return (
        <>
            <h2>Manage Permissions</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {PERMISSIONS.map((PERMISSION, index) => (
                            <th key={index}>{PERMISSION}</th>
                        ))}
                        <th>🔻</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserPermissions key={index} user={user}/>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

const UserPermissions = ({user}) => {
    const [permissions, setPermissions] = useState(user.permissions)

    const onChange = event => {
        const {value, checked} = event.target
        const newPermissions = [...permissions]

        if (checked) {
            newPermissions.push(value)
        } else {
            const index = newPermissions.indexOf(value)
            newPermissions.splice(index, 1)
        }

        setPermissions(newPermissions)
        return
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {PERMISSIONS.map((PERMISSION, index) => {
                return (
                    <td key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={PERMISSION}
                                checked={permissions.includes(PERMISSION)}
                                onChange={onChange}
                            />
                        </label>
                    </td>
                )
            })}
            <td>
                <SickButton>Update</SickButton>
            </td>
        </tr>
    )
}

UserPermissions.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}

export default Permissions
