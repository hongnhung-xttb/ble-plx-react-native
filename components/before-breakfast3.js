import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ToolbarAndroid
} from 'react-native';

export default class BeforeBreakfast3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: 'Sweating',
      isSelected: false,
      selected: { color: 'white' }
    };
  }
  toggleSelected = e => {
    let id = e.target.id;
    this.setState({
      isSelected: !this.state.isSelected
    });
    if (this.state.isSelected) {
      this.setState({
        selected: { color: 'green' }
      });
    } else {
      this.setState({
        selected: { color: 'white' }
      });
    }
  };
  onActionSelected = position => {
    if (position === 0) {
      // index of 'Settings'
      showSettings();
    }
  };
  render() {
    const img = {
      chat: require('../assets/images/chat1.png'),
      lap: require('../assets/images/lap1.png'),
      ask: require('../assets/images/ask1.png')
    };
    let { selected } = this.state;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={{ color: 'red' }}
          logo={require('../assets/images/chat1.png')}
          title="AwesomeApp"
          actions={[
            {
              title: 'Settings',
              icon: require('../assets/images/chat1.png'),
              show: 'always'
            }
          ]}
          onActionSelected={this.onActionSelected}
        />
        <View style={[styles.modalBody, styles.boxTitle]}>
          <Text style={styles.boxTitleText}>Before breakfast</Text>
          <Text
            style={[
              styles.boxTitleText,
              { marginStart: 'auto', fontSize: 14, textAlignVertical: 'center' }
            ]}
          >
            Wednesday 6 Mar
          </Text>
        </View>
        <View style={styles.modalBody}>
          <Text style={[styles.modalBodyText, { marginRight: 80 }]}>
            While your blood sugar level was low, did you experience any of the
            following?
          </Text>
          <View style={{ marginStart: 'auto' }}>
            <Image source={img.chat} style={styles.imgStyle} />
            <Image source={img.lap} style={styles.imgStyle} />
            <Image source={img.ask} style={styles.imgStyle} />
          </View>
        </View>
        <View style={styles.modalBody}>
          <View
            style={[
              styles.modalBody,
              { marginBottom: 0, flexDirection: 'column' }
            ]}
          >
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'1'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Sweating</Text>
              <Text style={{ color: 'green' }}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'2'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Tremors</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'3'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Dizzines</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'4'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Fatigue</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'5'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Blurred vision</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'6'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Headaches</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectTextWrap}
              id={'7'}
              onPress={this.toggleSelected}
            >
              <Text style={styles.selectText}>Increased hunger</Text>
              <Text style={selected}>&#10003;</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={[styles.baseButton, styles.buttonBack]}>
            <Text style={[styles.textTitle, { textAlign: 'center' }]}>
              &#60; Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleModal}
            style={[styles.baseButton, styles.buttonNext]}
          >
            <Text style={[styles.textTitle, { textAlign: 'center' }]}>
              Next &#62;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  modalBody: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b9b7ba',
    padding: 5,
    flexDirection: 'row',
    marginBottom: 10
  },
  modalBodyText: {
    fontSize: 18,
    color: 'black',
    padding: 5
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
    margin: 3,
    width: 40,
    height: 40
  },
  baseButton: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: '48%'
  },
  buttonBack: {
    borderColor: '#ec810a',

    backgroundColor:
      'linear-gradient(180deg, rgba(246,170,91,1) 16%, rgba(243,149,49,1) 30%, rgba(246,170,91,1) 53%)'
  },
  buttonNext: {
    borderColor: '#125990',
    backgroundColor:
      'linear-gradient(180deg, rgba(41,126,189,1) 30%, rgba(27,95,148,1) 30%, rgba(26,94,146,1) 40%)'
  },
  boxTitle: {
    padding: 10,
    backgroundColor:
      'linear-gradient(180deg, rgba(238,234,240,1) 40%, rgba(185,183,186,1) 60%)'
  },
  boxTitleText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    color: 'black'
  },
  selectTextWrap: {
    borderBottomWidth: 1,
    borderColor: '#7b797c',
    width: '100%',
    paddingBottom: 4,
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectText: {
    fontSize: 12,
    color: 'black'
  }
});
