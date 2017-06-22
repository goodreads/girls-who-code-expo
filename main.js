// Exported from snack.expo.io
import Expo from 'expo';
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ListView, Image, Dimensions, Button, Alert, ScrollView, Picker, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Constants, Svg } from 'expo';


/* TODO 4: Add your review to the book! Create your complete review with a userName, userIcon and text. Use the sample review as an example. */
const reviewsByBookTitle = {
  "Terrier": [
    {
      reviewerName: "Laudys",
      reviewerIcon: "https://images.gr-assets.com/users/1359481258p2/12020704.jpg",
      text: "What is one word I can use to sum up the book hmm... probably AWESOME ! Seriously there isn't a lot of books that can do that (at least for me). Beka Cooper is the most kick butt, cool heroine I've encountered in all my reading days."
    },
    {
      reviewerName: "Caroline",
      reviewerIcon: "https://images.gr-assets.com/users/1179332091p2/35781.jpg",
      text: "This was the last 'for fun' book I got to read before I started teaching last winter. Ever since I arbitrarily grabbed the first of Tamora Pierce's 'Circle of Magic' books off the library shelf two years ago, I've been hooked on the ways Pierce plays around with definitions of magic, power, heroes, and humanism...all within a medieval-ish context."
    }
  ]
};

const books = [
  {
    title: "Terrier",
    cover: "https://images.gr-assets.com/books/1398029898l/13829.jpg",
    author: {
      name: "Tamora Pierce",
      image: "https://images.gr-assets.com/authors/1209044273p8/8596.jpg"
    },
    publicationYear: "2006",
    averageRating: "4.16",
    ratingsCount: "49,053",
    userRating: 0,
    description: "Hundreds of years before Alanna first drew her sword in Tamora Pierce's memorable debut, Alanna: The First Adventure, Tortall had a heroine named Beka Cooper - a fierce young woman who fights crime in a world of magic. This is the beginning of her story, her legend, and her legacy....",
  },
  {
    title: "Croak",
    cover: "https://images.gr-assets.com/books/1479664293l/11836538.jpg",
    author: {
      name: "Gina Damico",
      image: "https://images.gr-assets.com/authors/1317056611p2/4983109.jpg"
    },
    publicationYear: "2012",
    averageRating: "3.93",
    ratingsCount: "9,350",
    description: "Hundreds of years before Alanna first drew her sword in Tamora Pierce's memorable debut, Alanna: The First Adventure, Tortall had a heroine named Beka Cooper - a fierce young woman who fights crime in a world of magic. This is the beginning of her story, her legend, and her legacy....",
  }
];

// TODO 6: change this to show the book you want
const bookToShow = books[0];

class Review extends PureComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired
  }
  render = () => {
    return (
      <View style={styles.reviewWrapper}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
              style={styles.userIcon}
              source={{
                uri: this.props.image,
              }}
          />
          <Text style={styles.userInfoText}>{this.props.name}</Text>
        </View>
        <Text style={styles.reviewText}>{this.props.text}</Text>
      </View>
    );
  }
}

export default class App extends PureComponent {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    let reviewsForShownBook = reviewsByBookTitle[bookToShow.title];
    let reviewsDataSource = ds.cloneWithRows(reviewsForShownBook || []);
    let currentValues = {
      review: false,
      reviewText: '',
      user: 'You',
      userRating: 0,
      wantToReadShelf: 'Want to Read',
      wantToReadModalVisible: false,
      reviewModalVisible: false,
      inputValue: "You can change me!"
    };
    this.state = Object.assign(
      {dataSource: reviewsDataSource},
      currentValues,
      bookToShow);
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
        {enabled
          ? this.renderTouchableStar(5, 5 <= initialRating)
          : this.renderStar(5, 5 <= initialRating)}
      </View>
    );
  };

  renderMyReview = () => {
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

  renderReviewFormWidget = () => {
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
              uri: this.state.cover,
            }}
          />
          <Text style={styles.title}>
            {this.state.title}
          </Text>

          <Text style={styles.subtitle}>
            by {this.state.author.name}
          </Text>

          {this.renderHorizontalBar()}
          <View style={styles.horizontalLayout}>
            {this.renderStarRating(this.state.averageRating, false)}
            <Text style={styles.subtitle}>
            {this.state.averageRating} ({this.state.ratingsCount} ratings)
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

          {this.renderMyReview()}
          {this.renderReviewFormWidget()}

          {/* Add more reviews here */}
          <Review
            name="Laudyss"
            image='https://images.gr-assets.com/users/1359481258p2/12020704.jpg'
            text="What is one word I can use to sum up the book hmm... probably AWESOME ! Seriously there isn't a lot of books that can do that (at least for me). Beka Cooper is the most kick butt, cool heroine I've encountered in all my reading days."
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
  reviewWrapper: {
    alignItems: 'left',
    width: windowWidth
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
