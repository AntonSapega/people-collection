import React from 'react';
import styles from './LoginForm.module.scss';
import AuthForm from '../AuthForm/AuthForm';
import StringButton from '../../../components/shared/String-button/String-button';
import Modal from '../../../components/Modal/Modal';
import BrandLogo from '../components/BrandLogo/BrandLogo';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleHelpCall = this.handleHelpCall.bind(this);

    this.state = {
      isPopupVisible: false,
    }
  }

  handleHelpCall() {
    this.setState(state => {
      return {
        isPopupVisible: !state.isPopupVisible
      }
    })
  }

  render() {
    const {onGetForm} = this.props;
    return (
      <>
        <div className={styles['login-form']}>
          <aside className={styles['login-form__left-side']}>
            <div className={styles['login-form__brand-logo']}>
              <BrandLogo title={this.props.title} description={this.props.description} />
            </div>
          </aside>
          <div className={styles['login-form__right-side']}>
            <div className={styles['login-form__btn-tip']}>
              <StringButton handleClick={this.handleHelpCall}>Need help?</StringButton>
            </div>

            <AuthForm onGetForm={(formValue) => onGetForm(formValue)} />
          </div>
        </div>
        {this.state.isPopupVisible &&
          <Modal
            title="Please choose one from two action"
            type={"confirm"}
            userChoice={() => this.handleHelpCall()}>
            {`Put your email and password if you have or create new account`}
          </Modal>
        }
      </>
    )
  }
}