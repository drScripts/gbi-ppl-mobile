import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import Stacknavigator from "./components/StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { UserProvider } from "./hooks/useUser";
import { UserScheduleProvider } from "./hooks/userSchedule";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <AuthProvider>
          <UserScheduleProvider>
            <Stacknavigator />
          </UserScheduleProvider>
        </AuthProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
