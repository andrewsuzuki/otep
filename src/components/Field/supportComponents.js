import PropTypes from 'prop-types'

import { styled, negate, halvePixels, propTypeBreakpoint } from '../../utils'

import { breakpoint, breakpointTo } from '../../mixins'


export const FlexGrow = styled.div({
  flexGrow: 1,
})


export const Marginal = styled.div(({ hasMarginBottom }, t) => ({
  ...hasMarginBottom && { marginBottom: t.fieldMarginBottom },
}))

Marginal.propTypes = {
  hasMarginBottom: PropTypes.bool.isRequired,
}


// Horizontal


export const HorizontalWrapper = styled.div(({ breakpoint: bkpt }) =>
  breakpoint(bkpt, {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }))

HorizontalWrapper.propTypes = {
  breakpoint: propTypeBreakpoint.isRequired,
}


export const HorizontalLeft = styled.div(({ breakpoint: bkpt }, t) =>
  breakpoint(bkpt, {
    width: '16%',

    // 'fBasis/0',
    flexGrow: 1,
    flexShrink: 0,

    marginRight: t.fieldHorizontalGap,

    textAlign: 'right',
  }),
)

HorizontalLeft.propTypes = {
  breakpoint: propTypeBreakpoint.isRequired,
}


export const HorizontalRight = styled.div(({ breakpoint: bkpt }) => ({
  ...breakpoint(bkpt, {
    flexBasis: 0,
    flexGrow: 5,
    flexShrink: 1,
  }),
}))

HorizontalRight.propTypes = {
  breakpoint: propTypeBreakpoint.isRequired,
}


// Grouped


export const GroupedRow = styled.div(({ breakpoint: bkpt }, t) => ({
  ...breakpoint(bkpt, {
    display: 'flex',

    marginLeft: negate(halvePixels(t.fieldGroupedGutter)),
    marginRight: negate(halvePixels(t.fieldGroupedGutter)),
  }),
}))

GroupedRow.propTypes = {
  breakpoint: propTypeBreakpoint.isRequired,
}


export const GroupedColumn = styled.div(({ breakpoint: bkpt, expanded }, t) => ({
  ...breakpoint(bkpt, {
    ...expanded && { flexGrow: 1, flexShrink: 0 },

    marginLeft: halvePixels(t.fieldGroupedGutter),
    marginRight: halvePixels(t.fieldGroupedGutter),
  }),
  ...breakpointTo(bkpt, {
    marginBottom: t.fieldMarginBottom,
  }),
}))

GroupedColumn.propTypes = {
  expanded: PropTypes.bool,
}


// Addons


export const AddonsRow = styled.div({
  display: 'flex',
})


export const AddonsColumn = styled.div(({ expanded }) => ({
  ...expanded && { flexGrow: 1, flexShrink: 0 },
}))

AddonsColumn.propTypes = {
  expanded: PropTypes.bool,
}
