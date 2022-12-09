import { FlatList, View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RepositoryInfo } from "./RepositoryItem";
import { useDebounce } from "use-debounce";
import RNPickerSelect from "react-native-picker-select";
import useRepositories from "../hooks/useRepositories";

const customPickerStyles = StyleSheet.create({
  inputWeb: {
    margin: 12,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "darkblue",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  filter: {
    padding: 11,
    margin: 11,
    fontSize: 16,
    backgroundColor: "white",
    border: "1px solid darkblue",
  },
});

const SortOptions = ({ setSortBy }) => {
  return (
    <RNPickerSelect
      style={{ ...customPickerStyles }}
      placeholder={{
        label: "Sort by repositories",
        value: "",
      }}
      onValueChange={(value) => setSortBy(value)}
      items={[
        { label: "Latest repositories", value: "CREATED_AT" },
        { label: "Highest rated repositories", value: "DESC" },
        { label: "Lowest rated repositories", value: "ASC" },
      ]}
    />
  );
};

const Filter = ({ setFilterText }) => {
  return (
    <TextInput
      onChangeText={(text) => setFilterText(text)}
      placeholder="Type text to filter repositories..."
      style={styles.filter}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View>
        <SortOptions setSortBy={props.setSortBy} />
        <Filter setFilterText={props.setFilterText} />
      </View>
    );
  };
  render() {
    const props = this.props;
    const onEndReach = props.onEndReach;
    const repositoryNodes = props.repositories
      ? this.props.repositories?.edges.map((edge) => edge.node)
      : [];
    return (
      repositoryNodes && (
        <FlatList
          ListHeaderComponent={this.renderHeader(props.setSortBy)}
          data={repositoryNodes}
          testID="repositoryItem"
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryInfo item={item} />}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      )
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterTextDebounced] = useDebounce(filterText, 500);
  const { repositories, fetchMore } = useRepositories(
    sortBy,
    filterTextDebounced
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
      setFilterText={setFilterText}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
