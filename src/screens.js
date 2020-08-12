import {Navigation} from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('blog.PostsList', () => require('./posts/screens/PostsLists').default);
    Navigation.registerComponent('blog.ViewPost', () => require('./posts/screens/ViewPost').default);
    Navigation.registerComponent('blog.AddPost', () => require('./posts/screens/AddPost').default);
}