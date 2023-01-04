// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { showNotification } from './modules/showNotification.js';
import axios from 'axios';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='price-slider'>
    <h2 class='title'>Price Slider</h2>
    <p>Use slider or enter min and max price</p>
    <div>
      <label>
        <span>Min</span>
        <input type='number' data-price='min' value='1800'>
      </label>
      <span class='separator'></span>
      <label>
        <span>Max</span>
        <input type='number' data-price='max' value='7800'>
      </label>
    </div>
    <div class='slider'>
      <div class='slider__progress' data-progress=''></div>
    </div>
    <div class='ranges'>
      <input class='ranges__input' type='range' data-range-price='min' min='0' max='10000' value='1800'step='100'>
      <input class='ranges__input' type='range' data-range-price='max' min='0' max='10000' value='7800'step='100'>
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      inputRange: document.querySelectorAll('[data-range-price]'),
      inputPrice: document.querySelectorAll('[data-price]'),
      progress: document.querySelector('[data-progress]'),
    };

    this.PROPS = {
      priceGap: 1000,
    };

    this.DOM.inputRange.forEach(range => range.addEventListener('input', this.onRange));
    this.DOM.inputPrice.forEach(range => range.addEventListener('input', this.onPrice));
  }

  /**
   * @function onRange - Range slider change event handler
   * @param rangePrice
   */
  onRange = ({ target: { dataset: { rangePrice } } }) => {
    const minVal = parseInt(this.DOM.inputRange[0].value);
    const maxVal = parseInt(this.DOM.inputRange[1].value);

    if (maxVal - minVal < this.PROPS.priceGap) {
      if (rangePrice === 'min') {
        this.DOM.inputRange[0].value = maxVal - this.PROPS.priceGap;
      } else {
        this.DOM.inputRange[1].value = minVal + this.PROPS.priceGap;
      }
    } else {
      this.DOM.inputPrice[0].value = minVal;
      this.DOM.inputPrice[1].value = maxVal;
      this.DOM.progress.style.left = (minVal / this.DOM.inputRange[0].max) * 100 + '%';
      this.DOM.progress.style.right = 100 - (maxVal / this.DOM.inputRange[1].max) * 100 + '%';
    }
  };

  /**
   * @function onPrice - Price input change event handler
   * @param rangePrice
   */
  onPrice = ({ target: { dataset: { price } } }) => {
    const minVal = parseInt(this.DOM.inputPrice[0].value);
    const maxVal = parseInt(this.DOM.inputPrice[1].value);

    if ((maxVal - minVal >= this.PROPS.priceGap) && maxVal <= 10000) {
      if (price === 'min') {
        this.DOM.inputRange[0].value = minVal;
        this.DOM.progress.style.left = (minVal / this.DOM.inputRange[0].max) * 100 + '%';
      } else {
        this.DOM.inputRange[1].value = maxVal;
        this.DOM.progress.style.right = 100 - (maxVal / this.DOM.inputRange[1].max) * 100 + '%';
      }
    }
  };
}

// ⚡️Class instance
new App();
