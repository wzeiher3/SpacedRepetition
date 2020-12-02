import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import './Registration.css'

class RegistrationRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = UserContext;

  handleRegistrationSuccess = (username, password) => {
    console.log(username, password)

    AuthApiService.postLogin({
      username: username,
      password: password,
    })
      .then(res => {
        this.context.processLogin(res.authToken)
        // this.props.onLoginSuccess()

        console.log(this.props)
        const { location, history } = this.props


        const destination = (location.state || {}).from || '/'
        history.push(destination)
      })
      .catch(res => {
        console.log(res.error)
      })

    //  history.push('/login')
  }


  // handleRegistrationSuccess = () => {
  //   const { history } = this.props
  //   history.push('/login')
  // }

  render() {
    return (
      <section>
        <p>
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
