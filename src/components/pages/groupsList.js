import React from 'react'
import NavBar from '../navBar'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {getGroups} from '../../actions/groupsActions'
import {postGroups} from '../../actions/groupsActions'
import {deleteGroups} from '../../actions/groupsActions'
import {deleteFunds} from '../../actions/groupsActions'
import {postFunds} from '../../actions/groupsActions'
import {bindActionCreators} from 'redux'
import {ProgressBar, Thumbnail, Well, Grid, Col, Row, Button, Accordion, Panel, InputGroup} from 'react-bootstrap'

class GroupsList extends React.Component {
  componentDidMount(){
    //Dispatching actions
    this.props.getGroups()
  }

  onFundDelete(groupId, fundId) {
    this.props.deleteFunds(groupId, fundId)
  }

  render() {
    //List of all groups & List of all funds
    const groupsList = this.props.groups.map(group => {
      return (
        <option key={group._id} value={group._id}>{group.groupName}</option>
      )
    })
    const fundsList = this.props.groups.map(group => {
      let funds = group.funds.map(fund => {
        return (
          <option key={fund._id} value={fund._id}>{fund.fundName}</option>
        )
      })
      return funds
    })
    //Creating Group Panels and Thumbnail's for Funds below said panels
    const groupPanels = this.props.groups.map(group => {
      const fundThumbnails = group.funds.map(fund => {
        console.log(fund._id)
        return (
          <Thumbnail className="col-md-3 col-sm-4 col-xs-12" key={fund._id} src={fund.image} alt="242x200">
            <h3 className="fundName">{fund.fundName}</h3>
            <h4 style={{textAlign: "center"}}>${fund.balance}/${fund.goal}</h4>
            <ProgressBar striped bsStyle={colorLogic(fund.balance, fund.goal)} active now={percentage(fund.balance, fund.goal)} />
            <p style={{textAlign: "center"}}>
              <Button onClick={this.onFundDelete.bind(this, group._id, fund._id)} bsStyle="danger">Delete</Button>
            </p>
          </Thumbnail>
        )
      })
      return (
        <Panel header={group.groupName} eventKey={group._id} key={group._id}>
          {fundThumbnails}
        </Panel>
      )
    })
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={7} sm={9} md={8}>
            <Accordion>
              {groupPanels}
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
  if ((balance / goal) * 100 >= 66.66) {
    return "success"
  } else if ((balance / goal) * 100 >= 33.33) {
    return "warning"
  } else {
    return "danger"
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
