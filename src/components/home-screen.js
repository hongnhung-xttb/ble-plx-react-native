import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import { BleManager } from 'react-native-ble-plx';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isLoading: false,
      isModalVisible: false,
      info: '',
      listDevices: [],
      scanState: 'Stop Scan'
    };
    this.manager = new BleManager();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };
  // bluetooth

  scanBluetooth = () => {
    this.setState({ listDevices: [] });
    if (Platform.OS === 'ios') {
      this.manager.onStateChange(state => {
        if (state === 'PoweredOn') {
          this.toggleLoading();
          this.toggleModal();
          this.scanAndConnect();
        }
      });
    } else {
      this.manager.state().then(state => {
        console.log('statet', state);
        if (state == 'PoweredOff') {
          this.manager.enable();
          this.toggleModal();
          this.toggleLoading();
          this.scanAndConnect();
          // alert('Please turn on bluetooth to scan');
        } else {
          this.toggleModal();
          this.toggleLoading();
          this.scanAndConnect();
        }
      });

      // this.manager.onStateChange(state => {});
    }
  };
  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: 'ERROR: ' + message });
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (device.name !== null) {
        console.log('device', device);
        if (this.state.listDevices.length === 0) {
          this.setState({
            listDevices: [device]
          });
          // if (device.name == 'Hồng Nhung xttb') {
          //   console.log('ok');
          //   this.manager.stopDeviceScan();
          // }
        } else {
          if (
            this.state.listDevices.findIndex(x => x.id === device.id) === -1
          ) {
            this.setState({
              listDevices: [...this.state.listDevices, device]
            });
          }
        }
      }

      if (error) {
        this.error(error.message);
        return;
      }
    });
  }
  connectBluetooth(device) {
    device
      .connect()
      .then(device => {
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(
        device => {
          alert(device.id);
        },
        err => {
          alert('Can not connect to this device');
        }
      );
  }
  wholeDevices() {
    const ble = this.manager;
    return this.state.listDevices.map(function(device, i) {
      return (
        <View key={i} style={{ padding: 10 }}>
          <TouchableOpacity
            style={styles.btnDeviceList}
            onPress={() => {
              ble.stopDeviceScan();
              device
                .connect()
                .then(device => {
                  return device.discoverAllServicesAndCharacteristics();
                })
                .then(
                  device => {
                    alert(device.id);
                  },
                  err => {
                    alert('Can not connect to this device');
                  }
                );
            }}
          >
            <Text>
              {device.name} - {device.id}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  }
  render() {
    const img = {
      chat: require('../assets/images/chat1.png'),
      lap: require('../assets/images/lap1.png'),
      ask: require('../assets/images/ask1.png')
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.baseButton, styles.buttonBack]}
          onPress={this.scanBluetooth}
        >
          <Text style={[styles.textTitle, { textAlign: 'center' }]}>Scan</Text>
        </TouchableOpacity>

        <Text>{this.state.info}</Text>
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
              paddingBottom: 100,
              backgroundColor: '#E1F0FC',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <View style={styles.headerModal}>
              <Text style={styles.textTitle}>Bluetooth</Text>
            </View>
            <View style={styles.titleModal}>
              <Text>Available Devices</Text>
              {this.state.isLoading ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : null}
            </View>
            <ScrollView style={{ flex: 1 }}>{this.wholeDevices()}</ScrollView>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                position: 'absolute',
                bottom: 20,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity style={[styles.modalButton, { marginEnd: 20 }]}>
                <Text
                  style={styles.textSmall}
                  onPress={() => {
                    this.toggleModal();
                    this.manager.stopDeviceScan();
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => {
                  this.manager.stopDeviceScan();
                  this.toggleLoading();
                }}
              >
                <Text style={[styles.textSmall, { textAlign: 'center' }]}>
                  Stop Scan
                </Text>
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
  // modal
  textTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textSmall: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalButton: {
    padding: 30,
    paddingTop: 5,
    paddingBottom: 10,
    borderColor: '#000',
    borderRadius: 30,
    borderWidth: 1
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
  btnDeviceList: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingBottom: 10
  },
  headerModal: {
    backgroundColor: '#326488',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10
  },
  titleModal: {
    backgroundColor: '#2f91df',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
