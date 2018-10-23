import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      axios.interceptors.response.use(null, error => {
        this.setState({ error: error.message });
      });
    }
    backdropHandler = () => {
      this.setState({ error: null });
    };
    componentDidMount() {}
    render() {
      return (
        <React.Fragment>
          <Modal
            showModal={this.state.error ? true : false}
            backdropHandler={this.backdropHandler}
          >
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;

// class withErrorHandler extends Component {
//   state = {};
//   render() {
//     return (
//       <React.Fragment>
//         <Modal showModal>Something didn't work...</Modal>
//         <WrappedComponent {...this.props} />
//       </React.Fragment>
//     );
//   }
// }

// export default withErrorHandler;
