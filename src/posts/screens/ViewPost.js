import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Button} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import * as postsActions from '../posts.actions';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.onPostDeletePressed = this.onPostDeletePressed.bind(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
    post: PropTypes.object,
  };

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'delete',
            text: 'Delete Post',
          },
        ],
      },
    };
  }

  navigationButtonPressed() {
    this.onPostDeletePressed();
  }

  onPostDeletePressed() {
    Navigation.pop(this.props.componentId);
    postsActions.deletePost(this.props.post.id);
  }

  render() {
    const {title, text} = this.props.post;
    return (
      <View flex spread padding-24>
        <View>
          <Text text30 purple10>
            {title}
          </Text>
          <Text text70 dark20 marginT-12>
            {text}
          </Text>
        </View>
        <Button
          title="Delete Post"
          onPress={this.onPostDeletePressed}
          color={'red'}
        />
      </View>
    );
  }
}

export default ViewPost;

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
