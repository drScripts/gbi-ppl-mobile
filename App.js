import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Stacknavigator from "./components/StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { UserProvider } from "./hooks/useUser";
import { UserScheduleProvider } from "./hooks/userSchedule";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "./hooks/useNotifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <UserProvider>
          <AuthProvider>
            <UserScheduleProvider>
              <Stacknavigator />
            </UserScheduleProvider>
          </AuthProvider>
        </UserProvider>
      </NavigationContainer>
    </NotificationProvider>
  );
}
