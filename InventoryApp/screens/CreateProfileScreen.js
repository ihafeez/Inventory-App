import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

export default class CreateProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			profileName: null,
			profiles: null
		}
	}
	
	async componentWillMount() {
		// load user profiles into state
		try {
			var profiles = await AsyncStorage.getItem('profiles');
			profiles = JSON.parse(profiles);
			this.setState(profiles);
			
			console.log("Profiles: " + this.state.profiles)
		} catch(e) {
		}
	}
	
	createProfile = () => {
		// add the new profile to the previously read list
		const newProfile = this.state.profileName;
		var profiles = this.state.profiles
		
		if (profiles != null) {
			// update the profile list
			profiles[newProfile] = {
				"items": {
				}
			}
		} else {
			// there are no profiles, so create a new list
			profiles = {
				newProfile: {
					"items": {
					}
				}
			}
		}
		
		// save the updated profile list
		AsyncStorage.setItem('profiles', JSON.stringify(profiles)).then(() => {
			// navigate to profile screen
			this.props.navigation.navigate("ProfileScreen");
		})
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Text>Enter new profile name:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(profileName) => this.setState({profileName})}
					value={this.state.profileName}
				/>
				<TouchableOpacity
					style={styles.submitButton}
					onPress={this.createProfile}
				>
					<Text>Create</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		height: 40,
		width: '80%',
		backgroundColor: '#fff',
		opacity: .9,
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 10
	},
	submitButton: {
		backgroundColor: 'lightblue',
		marginTop: 10,
		height: 40,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center'
	}
})