import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {getGroups} from '../../actions/groupsActions'
import {getUsers} from '../../actions/usersActions'
import {getUser} from '../../actions/usersActions'
import {postGroups} from '../../actions/groupsActions'
import {deleteGroups} from '../../actions/groupsActions'
import {deleteFunds} from '../../actions/groupsActions'
import {postFunds} from '../../actions/groupsActions'
import {bindActionCreators} from 'redux'
import {Modal, Image, ProgressBar, Thumbnail, Well, Grid, Col, Row, Button, Accordion, Panel, InputGroup} from 'react-bootstrap'

class GroupsList extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount(){
    this.props.getGroups()
    this.props.getUser()
  }

  toggleModal(modalId) {
    this.setState({ [modalId]: !this.state[modalId] || false })
  }

  onFundDelete(groupId, fundId) {
    this.props.deleteFunds(groupId, fundId)
  }

  getThumbnails = (group) => {
    return group.funds.map(fund => {
      let modalId = "showFundModal:" + fund._id.toString()
      return (
        <Thumbnail className="col-md-3 col-sm-4 col-xs-12" key={fund._id} src={fund.image} alt="242x200">
          <h3 className="fundName">{fund.fundName}</h3>
          <h4 style={{textAlign: "center"}}>${fund.balance}/${fund.goal}</h4>
          <ProgressBar striped bsStyle={colorLogic(fund.balance, fund.goal)} active now={percentage(fund.balance, fund.goal)} />
          <p style={{textAlign: "center"}}>
            <Button onClick={this.onFundDelete.bind(this, group._id, fund._id)} bsStyle="danger">Delete</Button>
            <Button onClick={this.toggleModal.bind(this, modalId)} bsStyle="primary">Manage</Button>
            <Modal bsSize="large" show={this.state[modalId]} onHide={this.toggleModal.bind(this, modalId)}>
              <Modal.Header style={{
                textAlign: "center",
                backgroundColor: "#2a2a2a",
                borderBottom: "3px solid #ec87d0" }}>
                <h1 style={{color: "#ec87d0"}}>{fund.fundName}</h1>
              </Modal.Header>
              <Modal.Body id="fund-body">
                <div id="fund-info-box">
                  <img id="fund-info-box-image" src={fund.image}/>
                  <Accordion>
                    <Panel header="Description" >
                      {fund.description}
                    </Panel>
                    <Panel header="Individual Goals" >
                      <p>ENTER USER STUFF HERE</p>
                      <p>ENTER USER STUFF HERE</p>
                    </Panel>
                  </Accordion>
                </div>
                <div id="fund-body-box">
                  <h3 style={{
                    textAlign: "center",
                    color: "#00d4ff",
                    fontWeight: "lighter"
                  }}>${fund.balance}/${fund.goal}</h3>
                  <h2 style={{color: "#f6f6f6"}}>Progress:</h2>
                  <ProgressBar id="fund-page" striped bsStyle={colorLogic(fund.balance, fund.goal)} active now={percentage(fund.balance, fund.goal)} />
                </div>
              </Modal.Body>
              <Modal.Footer style={{backgroundColor: "#2a2a2a"}}>
                <Button onClick={this.submitPayment} bsStyle="success">Submit Payment</Button>
                <Button onClick={this.toggleModal.bind(this, modalId)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </p>
        </Thumbnail>
      )
    })
  }

  getPanels = () => {
    return this.props.groups.map(group => (
      <Panel header={group.groupName} eventKey={group._id} key={group._id}>
        {this.getThumbnails(group)}
      </Panel>
    ))
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={7} sm={9} md={8}>
            <Accordion>
              {this.getPanels()}
            </Accordion>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function percentage(balance, goal) {
  return (balance / goal) * 100
}

function colorLogic(balance, goal) {
  if ((balance / goal) >= .66) {
    return "success"
  } else if ((balance / goal) >= .33) {
    return "warning"
  } else {
    return "danger"
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    users: state.users.users,
    user: state.users.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroups: getGroups,
    getUsers: getUsers,
    getUser: getUser,
    postGroups: postGroups,
    deleteGroups: deleteGroups,
    deleteFunds: deleteFunds,
    postFunds: postFunds
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
