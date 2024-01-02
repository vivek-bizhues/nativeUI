import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Navbar from './components/Navbar';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <Navbar />
  );
}