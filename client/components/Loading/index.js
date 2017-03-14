import React, {Component} from 'react';

import Spin from '../../components/Spin';
import createContainer from '../../lib/createContainer';

import styles from './index.scss';

class Loading extends Component {
  render() {
    const {loading} = this.props;

    if (loading === 0) {
      return null;
    }

    const Container = createContainer();

    return (
      <Container>
        <div>
          <div className={styles.mask}></div>
          <div className={styles.spin}>
            <Spin size={100} color="red" margin="100px auto" />
          </div>
        </div>
      </Container>
    );
  }
}

export default Loading;
