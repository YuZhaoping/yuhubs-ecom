import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILURE,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  CLEAN_AUTH_ERROR
} from 'Constants/auth';


/**
 * initial auth user
 */
const initialAuthState = () => {
  const authUser = {id: 0, name: 'TODO'};

  return {
    loading: false,
    user: authUser,
    username: authUser ? authUser.name : '',
    error: null
  };
};

export default (state = initialAuthState(), action) => {
  switch (action.type) {
    case SIGNIN_USER:
    case SIGNOUT_USER:
    case SIGNUP_USER:
      return { ...state, loading: true };

    case SIGNIN_USER_SUCCESS:
    case SIGNUP_USER_SUCCESS:
      {
        const authUser = action.payload;
        return { ...state,
          loading: false,
          user: authUser,
          username: authUser.name,
          error: null
        };
      }

    case SIGNIN_USER_FAILURE:
      return { ...state,
        loading: false,
        error: action.payload
      };

    case SIGNUP_USER_FAILURE:
      return { ...state,
        loading: false,
        username: action.username,
        error: action.payload
      };

    case SIGNOUT_USER_SUCCESS:
      return { ...state,
        loading: false,
        user: null,
        error: null
      };

    case SIGNOUT_USER_FAILURE:
      return { ...state,
        loading: false,
        user: null,
        error: action.payload
      };

    case CLEAN_AUTH_ERROR:
      return { ...state, error: null };


    default:
      return state;
  }
};