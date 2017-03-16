"use strict";

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, NativeModules, Button, Image, Dimensions} from "react-native";

const _width = Dimensions.get('window').width;

export default class RNImageToolsExample extends Component {
  constructor(props) {
    super(props);
    this._openGallery = this._openGallery.bind(this);
    this._openEditor = this._openEditor.bind(this);

    this.state = {
      originalImageUri: null,
      editedImageUri: null
    }
  }

  async _openGallery() {
    const uri = await NativeModules.RNImageTools.openGallery({});
    console.log("chosen uri", uri);
    this.setState({originalImageUri: uri, editedImageUri: null});
  }

  async _openEditor() {
    const uri = await NativeModules.RNImageTools.openEditor(this.state.originalImageUri);
    console.log("edited uri", uri);
    this.setState({editedImageUri: uri});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          react-native image tools example
        </Text>

        <View style={{marginVertical: 4}}>
          <Button
            onPress={this._openGallery}
            title="select image"
            color="#841584"
          />
        </View>

        {
          this.state.originalImageUri ? <View>
              <View style={{marginVertical: 4, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{borderWidth: 1, borderRadius: 4, borderColor: 'blue'}}>
                  <Image style={{width: _width / 2, height: _width / 2}} source={{uri: this.state.originalImageUri}}/>
                </View>
              </View>

              <View style={{marginVertical: 4}}>
                <Button
                  onPress={this._openEditor}
                  title="open editor"
                  color="#841584"
                />
              </View>

            </View> : null
        }

        {
          this.state.editedImageUri ? <View style={{marginVertical: 4, flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{borderWidth: 1, borderRadius: 4, borderColor: 'blue'}}>
                <Image style={{width: _width / 2, height: _width / 2}} source={{uri: this.state.editedImageUri}}/>
              </View>
            </View> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
    paddingHorizontal: 8
  },
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  }
});
