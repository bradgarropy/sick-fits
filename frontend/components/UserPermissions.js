import React from "react"
import {useState} from "react"
import PropTypes from "prop-types"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {SickButton} from "../styles"
import {PERMISSIONS} from "../utils/constants"
import Error from "./Error"

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($id: ID!, $permissions: [Permission]) {
        updatePermissions(id: $id, permissions: $permissions) {
            id
            name
            email
            permissions
        }
    }
`

const UserPermissions = ({user}) => {
    const {id} = user
    const [permissions, setPermissions] = useState(user.permissions)
    const [updatePermissions, {loading, error}] = useMutation(
        UPDATE_PERMISSIONS_MUTATION,
    )

    const onChange = async event => {
        const {value, checked} = event.target
        const newPermissions = [...permissions]

        if (checked) {
            newPermissions.push(value)
        } else {
            const index = newPermissions.indexOf(value)
            newPermissions.splice(index, 1)
        }

        setPermissions(newPermissions)

        await updatePermissions({
            variables: {
                id,
                permissions: newPermissions,
            },
        })

        return
    }

    const onClick = () => {
        updatePermissions({
            variables: {
                id,
                permissions,
            },
        })
    }

    return (
        <>
            {error && (
                <tr>
                    <td colSpan="9">
                        <Error error={error} />
                    </td>
                </tr>
            )}

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
                    <SickButton
                        type="button"
                        disabled={loading}
                        onClick={onClick}
                    >
                        Updat{loading ? "ing" : "e"}
                    </SickButton>
                </td>
            </tr>
        </>
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

export default UserPermissions
