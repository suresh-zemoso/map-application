import { logout } from "../auth/actions/loginAction"
import { store } from "../store";

export default function signout(props) {
    store.dispatch(logout())
}
