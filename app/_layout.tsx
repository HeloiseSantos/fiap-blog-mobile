import App from "./index";
import { Auth0Provider } from "react-native-auth0";

const domain = "dev-vzb0dhm7zcb5paj1.us.auth0.com";
const clientId = "VmVzjCj0B98h6pqbjfSMgcL99u4Eff5O";

export default function RootLayout() {
    return (
        <Auth0Provider domain = {domain} clientId={clientId}>
            <App />
        </Auth0Provider>
    );
}