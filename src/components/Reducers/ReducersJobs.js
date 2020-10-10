export const INIT_JOB = "Inicializar";
export const EDIT_JOB = "EDITAR";
export const ELIMINAR_JOB= "Eliminar";


export const jobReducer = (state, action) => {
    switch (action.type) {
      case INIT_JOB:
        return action.payload;/// inicializando el array, el payload devuelve la info de la API de users
      case EDIT_JOB:
        return state.map(job => {
          if (job.id === action.payload.id) {
            job.name = action.payload.name;
          }
          return job;
        })
      case ELIMINAR_JOB:
        console.log(action.payload.id, state)
        return state.filter(job=> job.id != action.payload.id)
      default:
        return state;
    }
  }