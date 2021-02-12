import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import firebase from 'firebase';
import base, { firebaseApp } from '../../base';
import Login from './Login';
import React from 'react';
import PropTypes from 'prop-types';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { uid: null, email: null, displayName: null },
      storeOwner: null,
    };
    this.authenticate = this.authenticate.bind(this);
    this.stealOwnership = this.stealOwnership.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Check if user is login in with password-less email
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log('result:', result);
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser

          this.authHandler(result);
        })
        .catch((error) => {
          console.log('error:', error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

  authHandler = async (authData) => {
    console.log('authData:', authData);
    const user = authData.user;
    console.log('user:', user);

    const storeId = this.props.storeId;

    // 1. Look up the current store in the firebase database
    const store = await base.fetch(storeId, {
      context: this,
    });
    console.log('store:', store);

    // 2. Claim it if there is no owners
    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: user.uid,
      });
    } else {
      const { owner } = store;
      console.log('owner:', owner);
    }

    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      user: { uid: user.uid, email: user.email, displayName: user.displayName },
      storeOwner: store.owner || user.uid,
    });
  };

  authenticate(provider) {
    console.log('authenticating ' + provider);

    if (provider === 'Email') {
      const userEmail = window.prompt(
        'Please provide your email for confirmation'
      );

      var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `https://www.fjrois.com/store/${this.props.storeId}`,
        handleCodeInApp: true,
      };

      firebaseApp
        .auth()
        .sendSignInLinkToEmail(userEmail, actionCodeSettings)
        .then(() => {
          //   // The link was successfully sent. Inform the user.
          //   // Save the email locally so you don't need to ask the user for it again
          //   // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', userEmail);
          alert('ok, email sent and info stored in localStorage');
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } else {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler)
        .catch((error) => {
          console.log('error:', error);
          const { code, message, email, credential } = error;
          console.log('code:', code);
          console.log('message:', message);
          console.log('email:', email);
          console.log('credential:', credential);
        });
    }
  }

  logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    this.setState({ user: { uid: null, email: null, displayName: null } });
  };

  stealOwnership = async () => {
    await base.post(`${this.props.storeId}/owner`, {
      data: this.state.user.uid,
    });

    this.setState((state) => {
      return {
        storeOwner: state.user.uid,
      };
    });
  };

  render() {
    const logoutButton = <button onClick={() => this.logout()}>Logout</button>;

    if (!this.state.user.uid) {
      return (
        <>
          <Login authenticate={this.authenticate} />
        </>
      );
    }

    const loginInfo =
      this.state.user?.email || this.state.user?.displayName ? (
        <p>
          You are logged in as {this.state.user.email} (
          {this.state.user.displayName})
        </p>
      ) : null;

    if (this.state.user.uid !== this.state.storeOwner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store!</p>
          {loginInfo}
          {logoutButton}
          <button onClick={() => this.stealOwnership()}>Steal ownership</button>
        </div>
      );
    }

    return (
      <>
        <div className="inventory">
          <h2>Inventory</h2>
          {loginInfo}
          {logoutButton}
          {Object.keys(this.props.fishes).map((fishId) => (
            <EditFishForm
              key={fishId}
              fishId={fishId}
              details={this.props.fishes[fishId]}
              editFish={this.props.editFish}
              removeFish={this.props.removeFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />

          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        </div>
      </>
    );
  }
}

Inventory.propTypes = {
  storeId: PropTypes.string.isRequired,
};

export default Inventory;
