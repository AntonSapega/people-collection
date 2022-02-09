import React from 'react';
import styles from './LoginForm.module.scss';
import AuthForm from '../AuthForm/AuthForm';
import StringButton from '../../../components/shared/String-button/String-button';
import Popup from '../../../components/Popup/Popup';

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
            <span className={`material-icons ${styles['login-form__icon']}`}>perm_identity</span>
            <h1 className={styles['login-form__title']}>{this.props.title}</h1>
            <span className={styles['login-form__description']}>{this.props.description}</span>
          </aside>
          <div className={styles['login-form__right-side']}>
            <div className={styles['login-form__btn-tip']}>
              <StringButton handleClick={this.handleHelpCall}>Need help?</StringButton>
            </div>
            
            <AuthForm onGetForm={(formValue) => onGetForm(formValue)} />
          </div>
        </div>
        {this.state.isPopupVisible &&
          <Popup
            type={'confirmation'}
            question={`You must log in`}
            userChoice={() => this.handleHelpCall()}
          />
        }
      </>
    )
  }
}