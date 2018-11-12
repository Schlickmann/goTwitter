import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput,  
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: ""
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username');

    if (username) {
      this.navigateToTimeline();
    }
  }

  handleInputChange = (username) => {
    this.setState({ username });
  };

  handleButtonClick = async () => {
    const { username } = this.state;

    if(!username.trim()) return;

    await AsyncStorage.setItem('@GoTwitter:username', username);

    //redireciona para nova pagina.
    this.props.navigation.navigate('Timeline');

    this.navigateToTimeline();
  };

  navigateToTimeline = () => {
    //reseta as telas da navegacao (forca a ter uma tela)
    //NavigationActions.navigate({ routeName: 'Timeline' }) recria o fluxo de navegacao do usuario
    const resetActions = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Timeline' })
      ]
    });

    //efetua o reset
    this.props.navigation.dispatch(resetActions);
  };

  render() {
    return (
      // propriedade behavior faz com que teclado nao fique em cima do campo
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>
          <TextInput 
            style={styles.input}
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleButtonClick}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleButtonClick}
          >
            <Text style={styles.buttonText}>Access</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
