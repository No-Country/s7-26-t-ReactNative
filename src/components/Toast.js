import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderColor: 'green', borderLeftColor: 'transparent', borderLeftWidth: 0, borderBottomWidth: 2, borderRadius: 2}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderColor: 'red', borderLeftColor: 'transparent', borderLeftWidth: 0, borderBottomWidth: 2, borderRadius: 2}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  )
};