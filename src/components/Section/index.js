import PropTypes from 'prop-types'

import { styled, expandStyles } from '../../utils'


const Section = styled.section(expandStyles(
  'fullWidth',

  'pTop/3rem',
  'pBottom/3rem',

  'bgc/~sectionBackgroundColor',
))


Section.propTypes = {
  children: PropTypes.node,
}


export default Section
