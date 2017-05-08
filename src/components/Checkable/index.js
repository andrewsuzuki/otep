import React from 'react'
import PropTypes from 'prop-types'

import {
  styled,
  expandStyles,
  capitalize,
  propTypeCheckableType,
  propTypeBrand,
} from '../../utils'


const StyledCheckGroup = styled('div', expandStyles(
  'relative',
  'd/block',
  'mTop/~checkableMargin',
))

const StyledBaseLabel = styled('label', ({ brand, disabled }) => expandStyles(
  'pointer',
  'd/inline-block',
  'pLeft/~checkableInputGutter',

  // Brand
  brand && `c/~brand${capitalize(brand)}`,

  // Disabled
  disabled && expandStyles('c/~grayLight', 'cursor/not-allowed'),
))

const StyledBaseInput = styled('input', ({ disabled }) => expandStyles(
  'pointer',
  'absolute',
  'mTop/~checkableInputMarginY',
  'mLeft/~checkableInputGutter~negate',

  // Disabled
  disabled && 'cursor/not-allowed',
))


export default function Checkable({ name, type, value, label, brand, disabled }) {
  return (
    <StyledCheckGroup>
      <StyledBaseLabel disabled={disabled} brand={brand}>
        <StyledBaseInput name={name} type={type} value={value} disabled={disabled} /> {label}
      </StyledBaseLabel>
    </StyledCheckGroup>
  )
}

Checkable.propTypes = {
  name: PropTypes.string,
  type: propTypeCheckableType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // has default (blank)

  brand: propTypeBrand,
  disabled: PropTypes.bool,
}

Checkable.defaultProps = {
  value: '',
}
