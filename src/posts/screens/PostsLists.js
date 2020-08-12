import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'remx';
import {postsStore} from '../posts.store';
import * as postsActions from '../posts.actions';

class PostsList extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array,
  };

  componentDidMount() {
    postsActions.fetchPosts();
  }

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add',
          },
        ],
      },
    };
  }

  navigationButtonPressed = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'blog.AddPost',
              passProps: {
                somePropToPass: 'Some props that we are passing',
              },
              options: {
                topBar: {
                  title: {
                    text: 'Add Post',
                  },
                },
              },
            },
          },
        ],
      },
    });
  };

  pushViewPostScreen = (post) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          post,
        },
        options: {
          topBar: {
            title: {
              text: 'Post1',
            },
          },
        },
      },
    });
  };

  renderItem = ({item}) => {
    <Text onPress={() => this.pushViewPostScreen(item)}>{item.title}</Text>;
  };

  postKeyExtractor = (item) => `${item.id}-key`;
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.pushViewPostScreen}>
          PostsLists Screen
        </Text>
        <FlatList
          data={this.props.posts}
          keyExtractor={this.postKeyExtractor}
          renderItem={this.renderItem}
        />
        {/* <Text>{JSON.stringify(this.props.posts)}</Text> */}
      </View>
    );
  }
}

function mapStateToProp() {
  return {
    posts: postsStore.getPosts(),
  };
}
export default connect(mapStateToProp)(PostsList);

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
