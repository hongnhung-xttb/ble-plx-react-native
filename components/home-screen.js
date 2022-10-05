import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

import Tutorial3 from './tutorial-3';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      isModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onChange = text => {
    this.setState({
      text
    });
  };

  render() {
    const img = {
      chat: require('../assets/images/chat1.png'),
      lap: require('../assets/images/lap1.png'),
      ask: require('../assets/images/ask1.png')
    };
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>Hello every one!</Text>
        <Text>I'm Nhung xinh đẹp :))</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onChange}
          placeholder="Enter your name"
        />
        <Text>Your name: </Text>
        <Text style={styles.name}>{this.state.text}</Text>
        <Button
          title="Next page"
          onPress={() => {
            if (this.state.text === '') {
              this.state.text = 'You did not enter your name';
            }
            this.props.navigation.navigate('Details', {
              name: this.state.text
            });
          }}
        /> */}
        <Button title="Show modal" onPress={this.toggleModal} />
        {/* <Tutorial3 isModal={this.state.isModalVisible} /> */}
        <Modal
          isVisible={this.state.isModalVisible}
          transparent={true}
          backdropOpacity={0.95}
          backdropColor={'#29252a'}
          animationOut={'fadeOut'}
          animationIn={'fadeIn'}
        >
          <View
            style={{
              flex: 1,
              paddingTop: 70,
              paddingBottom: 100
            }}
          >
            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>
                How many kids do you have?
              </Text>
              <View style={{ marginStart: 'auto' }}>
                <Image source={img.chat} style={styles.imgStyle} />
                <Image source={img.lap} style={styles.imgStyle} />
                <Image source={img.ask} style={styles.imgStyle} />
              </View>
            </View>
            <Text style={[styles.textTitle, { marginTop: 80 }]}>
              The "Question" section
            </Text>
            <Text style={styles.textSmall}>
              Contains the question or information
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.modalButton, { marginEnd: 20 }]}>
                <Text style={styles.textTitle}>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.toggleModal}
                style={styles.modalButton}
              >
                <Text style={styles.textTitle}>Quit the guide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    margin: 10
  },
  name: {
    color: 'red',
    fontSize: 40,
    marginBottom: 30
  },
  // modal
  modalBody: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#f3eff4',
    padding: 5,
    flexDirection: 'row'
  },
  modalBodyText: {
    fontSize: 18,
    color: 'black',
    paddingTop: 10
  },
  textTitle: {
    color: '#fff',
    fontSize: 20
  },
  textSmall: {
    color: '#fff',
    fontSize: 16
  },
  imgStyle: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#e9e7eb',
    margin: 5
  },
  modalButton: {
    padding: 30,
    paddingTop: 5,
    paddingBottom: 10,
    borderColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 30
  }
});
