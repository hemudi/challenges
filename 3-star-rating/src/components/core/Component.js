export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.init();
  }

  init() {
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  template() {
    return "";
  }

  mounted() {}

  render() {
    if (this.$target) {
      this.$target.innerHTML = this.template();
    }
    this.mounted();
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  setEvent() {}
}
