import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

/*
1.yarn add node-sass로 sass를 이용하자. create-react-app에는
sass를 css로 변경해주는 babel webpack을 이미 가지고 있다. 버전 때문에 에러가 뜨면 following step을 따라하면 됨.
나중에 문제 생기면 58강 체크

2.Routing in React 리액트는 ui라이브러리일 뿐이기 때문에 routing을 제공해주지는 않는다.
그래서 기능을 추가해야함(react-router-dom). 여러가지 페이지가 
바벨을 위한 라이브러리가 또 충돌할 수 있다. package.json 에 "resolutions": {
"babel-jest": "24.7.1" 버전에 맞게 추가한 다음. yarn install 다시 해주면 됨.


*/

export default App;
