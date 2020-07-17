import React, { SFC, useRef, useEffect } from 'react'
import { debounce } from 'lodash'
import styles from './index.module.less'

// 默认大屏长宽比为 16:9
const defaultSize = {
  screenWidth: 3840,
  screenHeight: 2160
}

const Layout: SFC = (props) => {
  const dashboardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = dashboardRef.current
    if (!node) return
    const computeScale = () => {
      let scaleVal = 1
      const { innerHeight: height, innerWidth: width } = window
      let { screenWidth, screenHeight } = defaultSize

      if ((height * screenWidth) / screenHeight < width) {
        scaleVal = height / screenHeight
      } else {
        scaleVal = width / screenWidth
      }

      node.style.transform = `scale(${scaleVal}) translate3d(-50%, -50%, 0)`
      node.style.paddingLeft = `${screenWidth}px`
      node.style.paddingTop = `${screenHeight}px`
    }

    computeScale()
    const handler = debounce(computeScale, 200)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [dashboardRef])

  return (
    <div className={styles.dashboard} ref={dashboardRef}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default Layout

// .dashboard {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate3d(-50%, -50%, 0);
//   transform-origin: top left;
//   width: 0;
//   .content {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//   }
// }
