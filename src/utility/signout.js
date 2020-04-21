import { logout } from "../actions/actions"
import { store } from "../store";

export default function signout(props) {
    store.dispatch(logout())
}
