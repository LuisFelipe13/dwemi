import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUsers} from '../../actions/usersActions'
import {getUser} from '../../actions/usersActions'
import {postUsers} from '../../actions/usersActions'
import {Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Checkbox, Button} from 'react-bootstrap'
import {Redirect} from 'react-router'
import Validator from 'validator'

class LoginSignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      attempted: false
    }
  }

  handleSignUp = (event) => {
    if (event) {
      event.preventDefault()
    }
    let firstName = findDOMNode(this.refs.firstName).value
    let lastName = findDOMNode(this.refs.lastName).value
    let email = findDOMNode(this.refs.email).value
    let emailConfirmation = findDOMNode(this.refs.emailConfirmation).value
    let password = findDOMNode(this.refs.password).value
    let passwordConfirmation = findDOMNode(this.refs.passwordConfirmation).value
    this.props.postUsers(firstName, lastName, email, emailConfirmation, password, passwordConfirmation)
    // this.setState({ attempted: true })
  }

  handleSignIn(event) {
    event.preventDefault()
    let email = findDOMNode(this.refs.loginEmail).value
    let password = findDOMNode(this.refs.loginPassword).value
    this.props.getUser(email, password)
    // if (this.props.users.length > 0) {
    //   this.setState({ redirect: true })
    // }
  }

  signUpErrors() {
    console.log(this.props.errors);
    if (this.props.errors.length > 0) {
      return this.props.errors[0].map((error, i)=> {
        return <div className="alert alert-danger" key={i}>{error.msg}</div>
      })
    }
    // var that = this
    // setTimeout(function(){
    //   if (that.state.attempted === true && that.props.errors.length === 0){
    //     that.setState({redirect: true})
    //   }
    // }, 2000);

  }

  userForms() {
    return (
      <Grid>
        <Col xs={12} sm={4}>
          <Row>
            {this.signUpErrors()}
            <div id="login">
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <FormControl type="email" placeholder="Email" ref="loginEmail" />
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <FormControl type="password" placeholder="Password" ref="loginPassword" />
                </FormGroup>

                <FormGroup>
                    <Button type="submit" onClick={this.handleSignIn.bind(this)}>
                      Sign in
                    </Button>
                </FormGroup>
              </Form>
            </div>
            <div id="signup">
              <Form horizontal>
                <FormGroup>
                    <FormControl type="text" placeholder="First Name" ref="firstName"/>
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" placeholder="Last Name" ref="lastName"/>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <FormControl type="email" placeholder="Email" ref="email"/>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <FormControl type="email" placeholder="Confirm Email" ref="emailConfirmation"/>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <FormControl type="password" placeholder="Password" ref="password"/>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <FormControl type="password" placeholder="Confirm Password" ref="passwordConfirmation"/>
                </FormGroup>

                <FormGroup>
                    <Checkbox>Agree to Terms & Conditions</Checkbox>
                </FormGroup>

                <FormGroup>
                    <Button type="submit" onClick={this.handleSignUp}>
                      Submit
                    </Button>
                </FormGroup>
              </Form>
            </div>
          </Row>
        </Col>
      </Grid>
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/home'/>;
    }
    return (
      <div>
        {this.userForms()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    user: state.users.user,
    errors: state.users.errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers: getUsers,
    getUser: getUser,
    postUsers: postUsers
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp)
