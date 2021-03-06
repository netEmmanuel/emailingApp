import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class StripeBilling extends Component {
  render() {
    return (
      <StripeCheckout
        name="EmailCampaign"
        description="Buy Survey Credits"
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn btn-primary">Click To Pay</button>
      </StripeCheckout>
    );
  }
}
export default connect(
  null,
  actions
)(StripeBilling);
