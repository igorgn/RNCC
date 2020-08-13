import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {View, TextField} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import * as postsActions from '../posts.actions';

class AddPost extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      title: '',
      text: '',
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSavePressed = this.onSavePressed.bind(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  static options() {
    return {
      topBar: {
        title: {
          text: 'Add Post',
        },
        leftButtons: [
          {
            id: 'cancel',
            text: 'Cancel',
          },
        ],
        rightButtons: [
          {
            id: 'save',
            text: 'Save',
            enabled: false,
          },
        ],
      },
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'cancel') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'save') {
      this.onSavePressed();
    }
  }

  onChangeText(text) {
    this.setState({text: text});
  }

  onSavePressed() {
    Navigation.dismissModal(this.props.componentId);
    const randomImageNumber = Math.floor(Math.random() * 500 + 1);
    postsActions.addPost({
      title: this.state.title,
      text: this.state.text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
    });
  }

  onChangeTitle(title) {
    this.setState({title: title});
    console.log(this.state.title);
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'save',
            text: 'Save',
            enabled: !!title,
          },
        ],
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextField
          text70
          containerStyle={{marginBottom: 12}}
          floatingPlaceholder
          placeholder="Add a Catchy Title"
          onChangeText={this.onChangeTitle}
          floatOnFocus
        />
        <TextField
          text70
          floatingPlaceholder
          placeholder="This is the beginning of a great post"
          onChangeText={this.onChangeText}
          expandable
        />
      </View>
    );
  }
}

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
