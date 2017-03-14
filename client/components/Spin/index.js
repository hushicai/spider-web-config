import React from 'react';
import classnames from 'classnames'

import styles from './index.scss'

function Spin(props) {
  const {size, color, margin} = props

  const className = classnames(
    props.className,
    styles.circle
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
    {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
        <div key={i} className={classnames(styles.item, styles['child' + i])}>
          <div style={{backgroundColor: color}} />
        </div>
      ))
    }
    </div>
  )
}

export default Spin;
