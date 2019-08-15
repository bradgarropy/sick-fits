import React from "react"
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
                        <User key={index} user={user}/>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

const User = ({user}) => {
    const {name, email} = user

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            {PERMISSIONS.map((PERMISSION, index) => {
                return (
                    <td key={index}>
                        <input type="checkbox"/>
                    </td>
                )
            })}
            <td>
                <SickButton>Update</SickButton>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Permissions
