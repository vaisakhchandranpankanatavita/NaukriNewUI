import {Linking, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Checkbox} from '../components/';
import {View} from 'react-native';
import {Register} from './Register.1';

export const isAndroid = Platform.OS === 'android';

export interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
export interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

export default Register;
