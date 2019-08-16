import React from "react"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import Error from "./Error"
import {Table} from "../styles"
import UserPermissions from "./UserPermissions"
import {PERMISSIONS} from "../utils/constants"

const READ_USERS_QUERY = gql`
    query READ_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`

const PermissionsTable = () => {
    const {loading, error, data} = useQuery(READ_USERS_QUERY)

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

export default PermissionsTable
