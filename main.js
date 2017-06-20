// Exported from snack.expo.io
import Expo from 'expo';
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ListView, Image, Dimensions, Button, Alert, ScrollView, Picker, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Constants, Svg } from 'expo';

export default class App extends PureComponent {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    /* TODO 4: Add your review to the book! Create your complete review with a userName, userIcon and text. Use the sample review as an example. */
    this.state = {
      dataSource: ds.cloneWithRows([
        {userName: "Ann Jones",
         userIcon: "https://imgs-tuts-dragoart-386112.c.cdn77.org/how-to-draw-katniss-everdeen-katniss-everdeen-hunger-games_1_000000010262_7.jpg",
         text: "The Claidi Journals follows the life of Claidi, a servant living a harsh life in a house catering to the nobles. She doesn't know what life lies beyond this House, other than a desert that the nobles say is filled with death. But one day, Claidi gets a chance to find out for herself what really is out there. And she takes it. This is where her journal begins."
        },
      ]),

      title: "Divergent",
      coverImage: "https://images.gr-assets.com/books/1328559506l/13335037.jpg",
      author: {
        name: "Veronica Roth",
        image: "https://images.gr-assets.com/authors/1363910238p8/4039811.jpg"
      },
      userRating: 0,
      review: false,
      reviewText: '',
      user: 'You',
      wantToReadShelf: 'Want to Read',
      wantToReadModalVisible: false,
      reviewModalVisible: false,
      inputValue: "You can change me!"
    };
  }

  renderStar = (value, filled) => {
    var fillColor = filled ? 'red' : lightGray;
    return (
      <Svg style={styles.iconSize}>
        <Svg.Path d={starVector} stroke="white" fill={fillColor} />
      </Svg>
    );
  };

  renderTouchableStar = (value, filled) => {
    var fillColor = filled ? 'red' : lightGray;
    return (
      <TouchableOpacity onPress={() => this._rate(value)}>
        <Svg style={styles.iconSize}>
          <Svg.Path d={starVector} stroke="white" fill={fillColor} />
        </Svg>
      </TouchableOpacity>
    );
  };

  // TODO 2: Add a star to the star rating bar to complete it
  renderStarRating = (initialRating, enabled) => {
    return (
      <View style={styles.horizontalLayout}>
        {enabled
          ? this.renderTouchableStar(1, 1 <= initialRating)
          : this.renderStar(1, 1 <= initialRating)}
        {enabled
          ? this.renderTouchableStar(2, 2 <= initialRating)
          : this.renderStar(2, 2 <= initialRating, false)}
        {enabled
          ? this.renderTouchableStar(3, 3 <= initialRating)
          : this.renderStar(3, 3 <= initialRating)}
        {enabled
          ? this.renderTouchableStar(4, 4 <= initialRating)
          : this.renderStar(4, 4 <= initialRating)}
      </View>
    );
  };

  renderReview = () => {
    if (this.state.review) {
      return (
        <View style={styles.linearLayout}>
          {this.renderHorizontalBar()}
          <View style={styles.horizontalLayout}>
            <Text style={styles.title}>My Review</Text>
            <Button title="Edit Review" onPress={this._editReview} />
          </View>
          <View style={styles.horizontalLayout}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://images.gr-assets.com/books/1366996057l/345299.jpg',
              }}
            />
            <View style={styles.linearLayout}>
              <Text style={styles.subtitle}>{this.state.user} rated it:</Text>
              {this.renderStarRating(this.state.userRating, false)}
              <Text style={styles.subtitle}>{this.state.reviewText}</Text>
            </View>
          </View>
          {this.renderHorizontalBar()}
        </View>
      );
    }
  };

  renderHorizontalBar = () => {
    return (
      <Svg height={2} width={windowWidth} margin={4}>
        <Svg.Rect
          x={10}
          width={windowWidth - 20}
          height={2}
          strokeWidth={1}
          stroke="white"
          fill="gray"
        />
      </Svg>
    );
  };

  renderDivider = () => {
    return (
      <Svg height={2} width={windowWidth} margin={4}>
        <Svg.Rect
          x={10}
          width={windowWidth - 30}
          height={2}
          strokeWidth={1}
          stroke="white"
          fill="powderblue"
        />
      </Svg>
    );
  };

  renderPicker = () => {
    return (
      <Picker
        selectedValue={this.state.shelf}
        onValueChange={shelf => this.setState({ shelf: shelf })}>
        <Picker.Item label="Want to Read" value="want_to_read" />
        <Picker.Item label="Reading" value="reading" />
        <Picker.Item label="Read" value="read" />
      </Picker>
    );
  };
  
  renderCommunityReview = (rowData) => {
    return (
      <View style={styles.communityReview}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            style={styles.userIcon}
            source={{
              uri: rowData.userIcon,
            }}
          />
          <Text style={styles.userInfoText}>{rowData.userName}</Text>
        </View>
        <Text style={styles.reviewText}>{rowData.text}</Text>
        {this.renderDivider()}
      </View>
    );
  };

  renderWantToReadWidget = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.wantToReadModalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 22 }}>
          <View style={styles.linearLayout}>
            <Button
              title="Want to Read"
              onPress={() => {
                this.setState({ wantToReadShelf: "Want to Read" });
                this.setState({ wantToReadModalVisible: false });
              }}
            />
            <Button
              title="Currently Reading"
              onPress={() => {
                this.setState({ wantToReadShelf: "Currently Reading" });
                this.setState({ wantToReadModalVisible: false });
              }}
            />
            <Button
              title="Read"
              onPress={() => {
                this.setState({ wantToReadShelf: "Read" });
                this.setState({ wantToReadModalVisible: false });
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  renderReviewWidget = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.reviewModalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 22 }}>
          <View style={styles.linearLayout}>
            <Text style={styles.title}>Your review: </Text>
            {this.renderStarRating(this.state.userRating, true)}
            <TextInput
              value={this.state.reviewText}
              multiline={true}
              editable={true}
              onChangeText={(text) => this.setState({reviewText: text})}
              style={{ height: 200, padding: 8 }}
            />
            <Button
              title="Submit"
              onPress={() => {
                  this.setState({ reviewModalVisible: false});
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  _setWTRVisible = () => {
    this.setState({ wantToReadModalVisible: true });
  };

  _editReview = () => {
    this.setState({ reviewModalVisible: true });
  };

  _rate = rating => {
    this.setState({ userRating: rating });
    this.setState({ review: true });
  };

  _handleButtonPress = () => {
    Alert.alert('Button pressed!', 'You did it!');
  };

  _showPreview = () => {
    'TODO:  Show Preview';
  };

  _share = () => {
    'TODO:  Share';
  };

  _buyACopy = () => {
    'TODO:  Buy a copy';
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

 //TODO 1: Change the cover image, book name and author name
 
 // TODO 5: Create a Share Button to the right of the Preview button
 
 // TODO 3: Add a color to the Want To Read button. Choose your color here: https://www.w3schools.com/colors/colors_picker.asp
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Svg height={60} width={windowWidth}>
            <Svg.Rect
              x={10}
              y={10}
              width={windowWidth - 20}
              height={50}
              strokeWidth={2}
              stroke="#3498db"
              fill="#3498db"
            />
            <Svg.Text
              x={windowWidth / 2}
              y={50 / 2 - 5}
              textAnchor="middle"
              fontWeight="bold"
              fontSize="20">
              AD SPACE
            </Svg.Text>
          </Svg>

          <Image
            style={styles.bookCover}
            source={{
              uri: 'http://www.daughterofthenight.com/tla85a.jpg',
            }}
          />
          <Text style={styles.title}>
            {this.state.title}
          </Text>

          <Text style={styles.subtitle}>
            by Tanith Lee
          </Text>

          {this.renderHorizontalBar()}
          <View style={styles.horizontalLayout}>
            {this.renderStarRating(3.89, false)}
            <Text style={styles.subtitle}>
            3.89 (94,000 ratings)
            </Text>
          </View>
          {this.renderHorizontalBar()}

          <Button
            title={this.state.wantToReadShelf}
            onPress={this._setWTRVisible}
          />

          {this.renderWantToReadWidget()}

          <View style={styles.horizontalLayout}>
            <Text style={styles.subtitle}>
              Your Rating:{' '}
            </Text>
            {this.renderStarRating(this.state.userRating, true)}
          </View>

          <View style={styles.horizontalLayout}>
            <Button
              title="Preview"
              onPress={this._showPreview}
              color="#D2B48C"
            />
          </View>

          <Button
            title="Buy a copy from Amazon"
            onPress={this._buyACopy}
            color="#D2B48C"
          />

          {this.renderReview()}
          {this.renderReviewWidget()}

          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => this.renderCommunityReview(rowData)}
          />
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const starVector =
  'M12,17.27L18.18,21l-1.64,-7.03L22,9.24l-7.19,-0.61L12,2 9.19,8.63 2,9.24l5.46,4.73L5.82,21z';
const lightGray = '#d3d3d3';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },
  linearLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  subtitle: {
    margin: 2,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
  bookCover: {
    width: windowWidth * 0.50,
    height: windowHeight * 0.43,
    margin: 10,
    resizeMode: 'stretch',
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 10,
    resizeMode: 'stretch',
  },
  iconSize: {
    height: 24,
    width: 24,
  },
  communityReview: {
  },
  reviewText: {
    margin: 20
  },
  userIcon: {
    marginLeft: 20,
    marginTop: 20,
    height: 40,
    width: 40,
    borderRadius: 20
  },
  userInfoText: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 15
  }
});

Expo.registerRootComponent(App);
