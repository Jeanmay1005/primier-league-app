import { useState } from "react";
import { View, TextInput } from "react-native";
// parse the function fro outer scope to inner scope
export function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <View>
      <TextInput
        value={innerSearch}
        placeholder="Search for team..."
        onChangeText={(text) => {
          setInnerSearch(text);
        }}
      />
      {props.onSubmit(innerSearch)}
    </View>
  );
}
