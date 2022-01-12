import { useState, useEffect } from 'react'
import UserConsumer from '../User/User';
import { connect } from 'react-redux';
import { addUser, addState } from '../../actions/appActions';
import { v4 as uuidv4 } from 'uuid';
import './UsersTable.css';
const UsersTable = ({ usersList, addUser, addState, isLightBoxOpen }) => {
    const [firstUsersLoading, setFirstUsersLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState('sort-up');
    const getDataFunction = async () => {
        await fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
            .then(res => res.json())
            .then(json => {
                setFirstUsersLoading(true);
                addState(json);
            });
    }
    useEffect(() => {
        getDataFunction()
    }, [])
    let sortedList
    if (sortMethod === 'sort-up') {
        sortedList = [...usersList].sort((a, b) => {
            if (a.username.toLowerCase() > b.username.toLowerCase()) {
                return -1
            }
            if (a.username.toLowerCase() < b.username.toLowerCase()) {
                return 1
            }
            return 0
        })
    } else if (sortMethod === 'sort-down') {
        sortedList = [...usersList].sort((a, b) => {
            if (a.username.toLowerCase() < b.username.toLowerCase()) {
                return -1
            }
            if (a.username.toLowerCase() > b.username.toLowerCase()) {
                return 1
            }
            return 0
        })
    } else if (sortMethod === 'no-sort') {
        sortedList = [...usersList]
    }
    const handleSortUsers = () => {
        if (sortMethod === 'sort-up') setSortMethod('sort-down')
        else if (sortMethod === 'sort-down') setSortMethod('no-sort')
        else if (sortMethod === 'no-sort') setSortMethod('sort-up')
    }
    const userElements = sortedList.map((user, index) => {
        if (index === 0) {
            return (
                [
                    <UserConsumer
                        key={uuidv4()}
                        idProps="Id"
                        nameProps="Name"
                        userNameProps="Username"
                        emailProps="Email"
                        cityProps="City"
                        editProps="Edit"
                        deleteProps="Delete"
                        canISort={sortMethod}
                        sortClickProps={handleSortUsers}
                    />,
                    <UserConsumer key={uuidv4()}
                        idProps={user.id}
                        nameProps={user.name}
                        userNameProps={user.username}
                        emailProps={user.email}
                        cityProps={user.address.city}
                        editProps="Edit"
                        deleteProps="Delete"
                        canISort="no-sort"
                        sortClickProps={() => { }}
                    />

                ]
            )
        } else {
            return (
                <UserConsumer
                    key={uuidv4()}
                    idProps={user.id}
                    nameProps={user.name}
                    userNameProps={user.username}
                    emailProps={user.email}
                    cityProps={user.address.city}
                    editProps="Edit"
                    deleteProps="Delete"
                    canISort="no-sort"
                    sortClickProps={() => { }}
                />
            )
        }
    })
    return (
        <div className={`users-table-container ${isLightBoxOpen ? 'cant-see' : 'can-see'}`}>
            <ul className="users-list">
                {usersList.length ? userElements : (!firstUsersLoading ? 'Please wait for Users loading' : 'List fo users is Empty add some User')}
            </ul>
        </div>
    );
}
const connectReduxStateToProps = store => {
    return ({
        usersList: store.users
    })
}
const connectActionsToProps = ({
    addUser, addState
})
const UsersTableConsumer = connect(connectReduxStateToProps, connectActionsToProps)(UsersTable)
export default UsersTableConsumer;