import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersContextProvider = ( {children} ) => {
  const [users, setUsers] = useState([]);


  function initUsersDB(usersArray) {
    setUsers(prevUsers => [...prevUsers, ...usersArray]);
  }

  function addNewUser(newUser) {
    sessionStorage.setItem('createdUser', JSON.stringify(newUser[0]));
    setUsers(prevState => [...prevState, ...newUser]);
  }

  function deleteUserFromDB(person) {
    const personPosition = users.findIndex(user => user.id === person.id);
    setUsers(prevState => {
      const modifiedState = [...prevState];
      modifiedState.splice(personPosition, 1);
      return modifiedState;
    });
  }

  return (
    <UsersContext.Provider value={{ usersDB: users, initUsersDB, addNewUser, deleteUserFromDB }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContextProvider, UsersContext };




// import React, { useState } from "react";

// const {Provider, Consumer} = React.createContext();

// const UsersContextProvider = ( {children} ) => {
//   const [users, setUsers] = useState([]);

//   function setUsersDB(newUser) {
//     setUsers(prevState => [...prevState, ...newUser])
//   }

//   return (
//     <Provider value={{ usersDB: users, setUsersDB: setUsersDB }}>
//       {children}
//     </Provider>
//   )
// }

// export { UsersContextProvider, Consumer as UsersContextConsumer };