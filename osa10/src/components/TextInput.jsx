import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 20,
    border: "1px solid #e1e4e8",
    marginBottom: 15,
    borderRadius: 5,
    fontSize: "1.1em",
  },
  errorOutLine: {
    border: "1px solid #d73a4a",
    fontSize: "1.1em",
  },
});
const TextInput = ({ error, ...props }) => {
  const errorOutLine = error ? styles.errorOutLine : "";
  return (
    <NativeTextInput
      style={{ ...styles.textInputStyle, ...errorOutLine }}
      {...props}
    />
  );
};

export default TextInput;
