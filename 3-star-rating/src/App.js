import Component from "./core/Component.js";
import Message from "./components/Message.js";
import StarRatingList from "./components/StarRatingList.js";

export default class App extends Component {
  setup() {
    this.$state = {
      ratingValue: 5,
    };
  }

  setRatingValue(newRatingValue) {
    if (newRatingValue !== this.$state.ratingValue) {
      this.setState({ ratingValue: newRatingValue });
    }
  }

  mounted() {
    const childProps = {
      ratingValue: this.$state.ratingValue,
      setRatingValue: this.setRatingValue.bind(this),
    };

    new Message(document.querySelector(".message"), childProps);
  }
}
