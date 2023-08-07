import Component from "./core/Component.js";
import StarRatingItem from "./StarRatingItem.js";

export default class StarRatingList extends Component {
  setup() {
    this.$state = {
      hoverValue: 0,
    };
  }

  setHoverValue(newValue) {
    if (newValue !== this.$state.hoverValue) {
      console.log("new Value : ", newValue);
      this.setState({ hoverValue: newValue });
    }
  }

  isFulled(value) {
    if (this.$state.hoverValue > 0) {
      return value <= this.$state.hoverValue;
    } else {
      return value <= this.$props.ratingValue;
    }
  }

  getStarItemProps(starValue) {
    return {
      ...this.$props,
      ...this.$state,
      value: starValue,
      setHoverValue: this.setHoverValue.bind(this),
    };
  }

  mounted() {
    return new Array(5)
      .fill(0)
      .map((_, index) => {
        const $starRatingItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.$target.appendChild($starRatingItem);
        new StarRatingItem($starRatingItem, this.getStarItemProps(index + 1));
      })
      .join("");
  }

  handleMouseLeave() {
    this.setState({ hoverValue: 0 });
  }

  setEvent() {
    this.$target.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
  }
}
