import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {getGroups} from '../actions/groupsActions'
import {postGroups} from '../actions/groupsActions'
import {deleteGroups} from '../actions/groupsActions'
import {deleteFunds} from '../actions/groupsActions'
import {postFunds} from '../actions/groupsActions'
import {bindActionCreators} from 'redux'
import {InputGroup, Modal, FormControl, FormGroup, ControlLabel, Nav, NavDropdown, MenuItem, NavItem, Navbar, Badge, Button} from 'react-bootstrap'

class NavBar extends React.Component{
  constructor() {
    super()

    this.state = {
      showCreateGroupModal: false,
      showDeleteGroupModal: false,
      showCreateFundModal: false
    }
  }

  handleSubmit = () => {
    const members1 = findDOMNode(this.refs.members1).value
    const members2 = findDOMNode(this.refs.members2).value
    const members3 = findDOMNode(this.refs.members3).value
    const members4 = findDOMNode(this.refs.members4).value
    const members5 = findDOMNode(this.refs.members5).value
    const group = [{
      groupName: findDOMNode(this.refs.groupName).value,
      members: [],
      funds: []
    }]
    if (members1 !== "select") {
      group[0].members.push(members1)
    }
    if (members2 !== "select") {
      group[0].members.push(members2)
    }
    if (members3 !== "select") {
      group[0].members.push(members3)
    }
    if (members4 !== "select") {
      group[0].members.push(members4)
    }
    if (members5 !== "select") {
      group[0].members.push(members5)
    }
    this.props.postGroups(group)
    this.setState({ showCreateGroupModal: false })
  }

  onGroupDelete = () => {
    let groupId = findDOMNode(this.refs.deleteGroup).value
    this.props.deleteGroups(groupId)
    this.setState({ showDeleteGroupModal: false })
  }

  onFundCreate = () => {
    let groupId = findDOMNode(this.refs.selectGroup).value
    let fundName = findDOMNode(this.refs.fundName).value
    let imageUrl = findDOMNode(this.refs.imageUrl).value
    let goal = findDOMNode(this.refs.goal).value
    let description = findDOMNode(this.refs.description).value
    this.props.postFunds(groupId, fundName, imageUrl, goal, description)
    this.setState({ showCreateFundModal: false })
  }
  //MODAL BUTTON OPEN/CLOSE METHODS
  openCreateGroupModal = () => {
    this.setState({ showCreateGroupModal: true })
  }
  openDeleteGroupModal = () => {
    this.setState({ showDeleteGroupModal: true })
  }
  openCreateFundModal = () => {
    this.setState({ showCreateFundModal: true })
  }
  closeCreateGroupModal = () => {
    this.setState({ showCreateGroupModal: false })
  }
  closeDeleteGroupModal = () => {
    this.setState({ showDeleteGroupModal: false })
  }
  closeCreateFundModal = () => {
    this.setState({ showCreateFundModal: false })
  }

  render() {
    //List of all groups & List of all funds
    const groupsList = this.props.groups.map(group => (
        <option key={group._id} value={group._id}>{group.groupName}</option>
    ))
    const usersList = this.props.users.map(user => (
        <option key={user._id} value={user._id}>{user.name}</option>
    ))
    const fundsList = this.props.groups.map(group => (
      group.funds.map(fund => (<option key={fund._id} value={fund._id}>{fund.fundName}</option>))
    ))


    return(
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header navbar-header-center">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#index-header">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand text-hide" href="/">Brand Text</a>
          </div>
          <div className="clearfix"></div>
          <div className="navbar-collapse collapse" id="index-header">
            <ul className="nav navbar-nav navbar-center">
              <li><a onClick={this.openDeleteGroupModal}>Delete Group</a></li>
                <Modal show={this.state.showDeleteGroupModal} onHide={this.closeDeleteGroupModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Group</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormGroup controlId="groupDelete">
                      <ControlLabel>Select Group</ControlLabel>
                      <FormControl componentClass="select" ref="deleteGroup">
                        <option>Select</option>
                        {groupsList}
                      </FormControl>
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.onGroupDelete} bsStyle="danger">Delete</Button>
                    <Button onClick={this.closeDeleteGroupModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
              <li><a onClick={this.openCreateGroupModal}>Create Group</a></li>
                <Modal show={this.state.showCreateGroupModal} onHide={this.closeCreateGroupModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Group</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormGroup controlId="groupCreate">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Group Name"
                        ref="groupName" />
                      <ControlLabel>Add Users</ControlLabel>
                      <FormControl componentClass="select" ref="members1">
                        <option value="select">select</option>
                        {usersList}
                      </FormControl><br/>
                      <FormControl componentClass="select" ref="members2">
                        <option value="select">select</option>
                        {usersList}
                      </FormControl><br/>
                      <FormControl componentClass="select" ref="members3">
                        <option value="select">select</option>
                        {usersList}
                      </FormControl><br/>
                      <FormControl componentClass="select" ref="members4">
                        <option value="select">select</option>
                        {usersList}
                      </FormControl><br/>
                      <FormControl componentClass="select" ref="members5">
                        <option value="select">select</option>
                        {usersList}
                      </FormControl>
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleSubmit} bsStyle="success">Create</Button>
                    <Button onClick={this.closeCreateGroupModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
              <li><a onClick={this.openCreateFundModal}>Create Fund</a></li>
                <Modal show={this.state.showCreateFundModal} onHide={this.closeCreateFundModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Fund</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormGroup controlId="fundDelete">
                      <ControlLabel>Select Group</ControlLabel>
                      <FormControl componentClass="select" ref="selectGroup">
                        <option>Select</option>
                        {groupsList}
                      </FormControl>
                      <ControlLabel>Fund Name</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Couch, TV, Spring Break, etc"
                        ref="fundName" />
                      <ControlLabel>Image URL</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="www.example.com/image/1.png"
                        ref="imageUrl" />
                      <ControlLabel>Monetary Goal</ControlLabel>
                      <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl
                          type="text"
                          placeholder="000.00"
                          ref="goal"/>
                      </InputGroup>
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        placeholder="Describe the fund here"
                        ref="description" />
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.onFundCreate} bsStyle="success">Create</Button>
                    <Button onClick={this.closeCreateFundModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}



function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    users: state.users.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroups: getGroups,
    postGroups: postGroups,
    deleteGroups: deleteGroups,
    deleteFunds: deleteFunds,
    postFunds: postFunds
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
