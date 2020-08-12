import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
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
    postsActions.deletePost(this.props.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>View Screen</Text>
        {/* <Text>{JSON.stringify(this.props.post)}</Text> */}
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
