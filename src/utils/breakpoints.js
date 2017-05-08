/**
 * Breakpoint helpers
 */

import invariant from 'invariant'
import memoize from 'lodash.memoize'

import * as mixins from '../mixins'

import * as valids from './valids'

import { capitalize } from './helpers'


/**
 * Map fn to breakpoint names, then merge results
 * @param  {Function} fn
 * @param  {Boolean}  [exceptSmallest=false]
 * @return {obj}
 */
export function breakpointsMapAndMerge(fn, exceptSmallest = false) {
  const bkpts = exceptSmallest ? valids.validBreakpoints.slice(1) : valids.validBreakpoints
  return Object.assign({}, ...bkpts.map(fn))
}


/**
 * Create a spec-string->style-object map based on an array
 * of values, a spec-string prefix, and a style-object generator (styleFn)
 * @param  {array} values     list of values, which can either be strings or
 *                            a sub-array of [name, value] where name
 *                            is placed as the suffix in the spec-string
 *                            and value is given to styleFn
 * @param  {string} prefix    prefix for each spec-string
 *                            (e.g. 'justify-content:')
 * @param  {function} styleFn turns each value into a style object
 * @return {object}           map of spec-strings to style-objects
 */
export function breakpointsCreateSpecsOnValues(values, prefix, styleFn) {
  return Object.assign({}, ...values.map((v) => {
    const [name, value] = Array.isArray(v) ? v : [v, v]

    return { [`${prefix}${name}`]: styleFn(value) }
  }))
}


/**
 * Create a memoized parsing function for spec strings
 * @param  {object}   dict map of single-spec strings to style objects
 * @return {function} parser that turns full spec strings into style objects
 */
export function breakpointsCreateSpecStringParser(dict) {
  return memoize((s) => {
    const specs = s.split('/')

    const resolvedSpecs = specs.map((m) => dict[m] || m)

    // verify
    resolvedSpecs.forEach((rs) => {
      invariant(
        typeof rs === 'object',
        `Spec '${rs}' does not exist`,
      )
    })

    return Object.assign({}, ...resolvedSpecs)
  })
}


/**
 * Create styles under breakpoints for all spec strings
 * in props with breakpoint names.
 * e.g. { tiny: '4/align-self:center' }
 *        => { '@media ...': { width: '33.3%', ... } }
 * @param  {object}   props         props which may contain breakpoint names as keys
 * @param  {function} propGuardFn   applied to all props[breakpointName] lookups
 *                                  e.g. can default bool true into
 *                                  a parse-able string
 * @param  {function} parser        turns spec strings into style objects
 * @param  {function} parsedGuardFn applied to parser result
 * @return {object}                 some (or none) breakpoint media queries
 *                                  with child style objects
 */
export function breakpointsCreateBreakpointsForPropSpecStrings(
  props,
  propGuardFn,
  parser,
  parsedGuardFn) {
  return breakpointsMapAndMerge((breakpointName) => {
    const propMaybe = props[breakpointName]

    const propGuarded = propGuardFn(propMaybe)

    if (typeof propGuarded === 'string' && propGuarded.length) {
      const parsed = parser(propGuarded)

      const parsedGuarded = parsedGuardFn(parsed)

      return mixins.breakpoint(breakpointName, parsedGuarded)
    }

    return {}
  })
}


/**
 * Convert breakpoint name to row columns pass breakpoint name (memoized)
 * e.g. 'tablet' => 'columnsTablet'
 */
export const breakpointNameToColumnsPassBreakpointName = memoize((bkpt) =>
  `columns${capitalize(bkpt)}`)
