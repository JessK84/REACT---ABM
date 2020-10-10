export const INIT = "Inicializar";
export const ADD = "Agregar";
export const EDIT = "EDITAR";
export const ELIMINAR = "Eliminar";

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return action.payload;/// inicializando el array, el payload devuelve la info de la API de users
    case ADD:
      return [...state, action.payload];/// aca estamos 
    case EDIT:
      return state.map(user => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.job = action.payload.job;
        }
        return user;
      })
    case ELIMINAR:
      return state.filter(user=> user.id !== action.payload.id)
    default:
      return state;
  }
}
