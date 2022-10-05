import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default class Tutorial3 extends Component {
  render() {
    const img = {
      chat: require('../assets/images/chat1.png'),
      lap: require('../assets/images/lap1.png'),
      ask: require('../assets/images/ask1.png')
    };
    let { isModal } = this.props;

    return (
      <Modal
        isVisible={this.props.isModal}
        transparent={true}
        backdropOpacity={0.95}
        backdropColor={'#29252a'}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 70,
            paddingBottom: 100
          }}
        >
          <View style={styles.modalBody}>
            <Text style={styles.modalBodyText}>How many kids do you have?</Text>
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
    );
  }
}

Tutorial3.defaultProps = {
  isModal: false
};
const styles = StyleSheet.create({
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
