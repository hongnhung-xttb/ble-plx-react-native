import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  FlatList
} from 'react-native';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const defaultValue = 'No name';
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={styles.welcome}>Hello</Text>
        <Text style={styles.name}>
          {this.props.navigation.getParam('name', defaultValue)}
        </Text>
        <Text>Below is a movie list for you</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Text style={styles.welcome}>
              {item.title}, {item.releaseYear}
            </Text>
          )}
          keyExtractor={({ id }, index) => id}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
          color="#194D33"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5
  },
  input: {
    width: '80%',
    borderColor: '#333',
    borderWidth: 2,
    color: '#000',
    marginTop: 10
  },
  button: {
    color: '#841584',
    marginBottom: 40,
    backgroundColor: '#3CE18F'
  },
  buttonBack: {
    color: '#194D33',
    marginBottom: 30
  },
  name: {
    color: 'red',
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center'
  }
});
