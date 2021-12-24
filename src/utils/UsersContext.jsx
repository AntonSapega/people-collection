import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersContextProvider = ( {children} ) => {
  const [users, setUsers] = useState([]);

  function setUsersDB(newUser) {
    setUsers(prevState => [...prevState, ...newUser])
  }

  return (
    <UsersContext.Provider value={{ usersDB: users, setUsersDB: setUsersDB }}>
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