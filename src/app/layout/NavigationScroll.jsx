import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children, onNavigation }) => {
    const location = useLocation()
    const { pathname } = location

    useEffect(() => {
		onNavigation()
    }, [pathname])

    return children || null
}

NavigationScroll.propTypes = {
    children: PropTypes.node,
	onNavigation: PropTypes.func
}

export default NavigationScroll