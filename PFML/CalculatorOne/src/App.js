import React, { Component } from 'react';
import { Header, Footer } from '@massds/mayflower-react';
import UtilityNavData from './data/UtilityNav.data';
import MainNavData from './data/MainNav.data';
import HeaderSearchData from './data/HeaderSearch.data';
import FooterLinksLiveData from './data/FooterLinksLive.json';
import SocialLinksLiveData from './data/SocialLinksLive.json';

import './index.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.footerProps = {
      footerLinks: FooterLinksLiveData.footerLinks,
      socialLinks: SocialLinksLiveData.socialLinks
    };
    this.headerProps = {
      utilityNav: UtilityNavData,
      headerSearch: HeaderSearchData,
      mainNav: MainNavData,
      hideHeaderSearch: true,
      hideBackTo: true,
      siteLogoDomain: { url: { domain: 'https://www.mass.gov/' } }
    };
  }
  render() {
    return (
      <div className="App">
        <Header {...this.headerProps} />
          <main className="main-content">
            <section className="main-content--two">
              <div className="ma__page-header__content">
                <h1 className="ma__page-header__title">Paid Family Medical Leave Contribution Caculator</h1>
                <div className="page-content">
                  <form class="ma__form-page" action="#">
                    <fieldset>
                      <div class="ma__input-group">
                        <div class="ma__input-group__title">
                          Do you have any employees in Massachusetts?
                          <div class="ma__input-group__items ma__input-group__items--inline">
                            <div class="ma__input-group__item">
                              <span class="ma__input-radio">
                                <input name="ma-employee" type="radio" value="yes" id="ma-employee-yes" />
                                <label for="ma-employee-yes"><span>Yes</span></label>
                              </span>
                            </div>
                            <div class="ma__input-group__item">
                              <span class="ma__input-radio">
                                <input name="ma-employee" type="radio" value="no" id="ma-employee-no" />
                                <label for="ma-employee-no"><span>No</span></label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ma__input-group--inline">
                        <label
                          for="number-input"
                          class="ma__label ma__label--inline ma__label--required ">How many of your MA employees receive W2s?
                        </label>
                        <input
                          class="ma__input js-is-required"
                          name="number-input"
                          id="number-input"
                          type="number"
                          placeholder="type something"
                          data-type="number"
                          maxlength="16"
                            pattern="[0-9]*"
                          required />
                      </div>
                      <div class="ma__input-group--inline">
                        <label
                          for="number-input"
                          class="ma__label ma__label--inline ma__label--required ">How many of your MA employees receive W2s?
                        </label>
                        <input
                          class="ma__input js-is-required"
                          name="number-input"
                          id="number-input"
                          type="number"
                          placeholder="type something"
                          data-type="number"
                          maxlength="16"
                            pattern="[0-9]*"
                          required />
                      </div>
                    </fieldset>
                    <hr />
                  </form>
                </div>
              </div>
            </section>
          </main>
        <Footer {...this.footerProps} />
      </div>
    );
  }
}

export default App;
