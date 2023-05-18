import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import {LANGUAGES, USER_ROLE} from '../../utils/constant';
import { changeLanguageApp } from "../../store/actions/appActions";
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
      super(props)
      this.state = {
        menuApp: []
      }
    }
    
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
      let {userInfo} = this.props;
      let menu = []
      console.log('>>>Check user: ', userInfo, USER_ROLE.ADMIN, USER_ROLE.DOCTOR)
      if(userInfo && !_.isEmpty(userInfo)) {
        let role = userInfo.roleId
        if(role === USER_ROLE.ADMIN) {
          menu = adminMenu
        }else if(role === USER_ROLE.DOCTOR) {
          menu = doctorMenu
        }
      }
      this.setState({
        menuApp: menu
      })
    }

    render() {
    const { processLogout, userInfo } = this.props;
    console.log(this.state.menuApp)
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* nút logout */}
        <div className="languages">
          <span className="welcome"><FormattedMessage id="home-header.welcome"/> {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
          <div className="box">
            <span className={this.props.language === LANGUAGES.VI ? "language-vi active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
            <span className={this.props.language === LANGUAGES.EN ? "language-en active" : "language-vi"} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
          </div>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log Out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => {
        dispatch(actions.changeLanguageApp(language))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
